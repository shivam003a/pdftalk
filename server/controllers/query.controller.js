import { llmCompletion } from '../config/llmCompletion.config.js';
import { searchPinecone } from '../config/pinecone.config.js';
import Chat from '../models/chat.model.js'

export const queryPdf = async (req, res) => {
    try {
        const { query, chatId } = req.body;
        const { _id } = req.user;

        if (!query || !chatId) {
            return res.error("query and chatId must be present", null, 400)
        }
        const chatExists = await Chat.findOne({
            _id: chatId,
            userId: _id
        })
        if (!chatExists) {
            return res.error("Chat does not exist", null, 400)
        }

        // embedding qury
        const embeddings = await embedQuery(query);

        // query pinecone
        const result = await searchPinecone(embeddings, chatExists?.namespace, 5)

        // prepare Propmpt
        const prompt = preparePrompt(result, query)

        // get answer
        const answer = await llmCompletion(prompt)

        // saving chats to db
        chatExists.messages.push(
            {
                role: 'user',
                content: query
            },
            {
                role: 'ai',
                content: answer
            }
        )
        const updatedChat = await chatExists.save();

        return res.success("Query Successfull", updatedChat?.messages, 200)

    } catch (e) {
        console.error(e)
        return res.error(e?.message || "Internal Server Error", null, 500)
    }
}

const embedQuery = async (query) => {
    try {
        const response = await fetch("https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: [query],
                options: { wait_for_model: true }
            })
        })

        if (!response.ok) {
            throw new Error('HuggingFaceEmbeddings Failed')
        }

        const embeddings = (await response.json()).flat();
        return embeddings;

    } catch (e) {
        throw new Error(e?.message || "Embedding Failed")
    }
}

const preparePrompt = (matches, query) => {
    if (!matches && !query) {
        throw new Error("context and query is must")
    }
    const topKMatches = matches
        .filter((match) => match.score > 0.1)
        .map((match) => ({
            id: match?.id,
            score: match?.score,
            pageContent: match?.metadata?.pageContent,
            pageNumber: match?.metadata?.pageNumber

        }))

    const context = topKMatches.map(m => `Page ${m.pageNumber}: ${m.pageContent}`).join('\n');

    const prompt = `
Use the following context to answer the user's question:
${context}

Question: ${query}
Answer:
`;

    return prompt;
}