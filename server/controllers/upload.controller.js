import { uploadToCloudinary } from "../config/cloudinary.config.js";
import Chat from "../models/chat.model.js";
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { Document } from 'langchain/document'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { upsertVectors } from "../config/pinecone.config.js";
import { calculateMD5Hash } from "../utils/md5Generator.js";
import fs from 'fs'

export const uploadPdf = async (req, res) => {
    try {
        const file = req.file;
        const { _id } = req.user;

        if (!file) {
            return res.error("no File Uploaded", null, 400)
        }

        // chec md5 hash to avoid same pdf uploaded multiple times
        const md5Hash = await calculateMD5Hash(file?.path)
        const existing = await Chat.findOne({ userId: _id, fileHash: md5Hash })
        if (existing) {
            return res.error("Duplicate File Upload Detected", null, 409)
        }

        const cleanedFileName = file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-');
        const namespace = `${_id}-${cleanedFileName}-${Date.now()}`


        const cloudinaryResponse = await uploadToCloudinary(file.path, 'pdftalk/')

        // object to be stored in db
        const chatObj = {
            userId: _id,
            chatName: cleanedFileName,
            pdfUrl: cloudinaryResponse?.secure_url,
            cloudinaryPublicId: cloudinaryResponse?.public_id,
            namespace: namespace,
            fileHash: md5Hash
        }

        // Extract Text from PDF
        const pages = await extractText(file?.path);

        // Prepare Document 
        const docs = (await Promise.all(pages.map(async (page) => prepareDocuments(page)))).flat();

        // Embedding
        const pineconeVectors = await embedChunks(docs, namespace)

        // console.log(pineconeVectors)
        const upsertResponse = await upsertVectors(pineconeVectors, namespace)

        fs.unlinkSync(file.path)

        const chat = await Chat.create(chatObj)
        return res.success("Uploaded", {
            _id: chat?._id,
            chatName: chat?.chatName,
            pdfUrl: chat?.pdfUrl
        }, 200)

    } catch (e) {
        console.error(e)
        return res.error(e?.message || "Internal server Error", null, 500)
    }
}

const extractText = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('No File Path Given')
        }

        const loader = new PDFLoader(filePath)
        const pages = await loader.load()

        return pages;

    } catch (e) {
        throw new Error(e?.message || "Text Extraction Failed")
    }
}

const prepareDocuments = async (page) => {
    try {
        if (!page || !page?.pageContent.trim()) {
            return [];
        }

        let { pageContent, metadata } = page;
        pageContent = pageContent.replace(/\n/g, '').trim()

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 600,
            chunkOverlap: 100
        })
        const docs = await splitter.splitDocuments([
            new Document({
                pageContent,
                metadata: {
                    pageNumber: metadata?.loc?.pageNumber || null,
                    text: pageContent.slice(0, 300)
                }
            })
        ])

        return docs;

    } catch (e) {
        console.error('Chunking Failed for a page:', e?.message)
        return [];
    }
}

const embedChunks = async (chunks, namespace) => {
    try {
        const batchSize = 5;
        const vectors = [];

        if (!Array.isArray(chunks) && !namespace) {
            throw new Error('Chunks must be an array and namespace must be provided')
        }

        for (let i = 0; i < chunks.length; i += batchSize) {
            const batch = chunks.slice(i, i + batchSize)

            const response = await fetch("https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: batch.map((doc) => doc.pageContent),
                    options: { wait_for_model: true }
                })
            })

            if (!response.ok) {
                throw new Error('HuggingFaceEmbeddings Failed')
            }

            const embeddings = await response.json();

            embeddings.map((vec, index) => {
                vectors.push({
                    id: `${namespace}-chunk-${index + i}`,
                    values: vec,
                    metadata: {
                        pageContent: batch[index]?.pageContent,
                        pageNumber: batch[index]?.metadata?.pageNumber,
                        text: batch[index]?.metadata?.text
                    }
                })
            })
        }

        return vectors;
    } catch (e) {
        throw new Error(e || "Embeddings Failed")
    }
}