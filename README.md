# 📄 Chat with PDF - RAG App

A full-stack **Chat with PDF** application that allows users to:

- Upload a PDF
- Extract text and split it into chunks
- Generate embeddings using HuggingFace API
- Store embeddings in Pinecone for fast similarity search
- Chat with the document using Retrieval-Augmented Generation (RAG)

---

## 🚀 Features

- **User Authentication** (JWT or OAuth)
- **PDF Upload** (via Multer & Cloudinary)
- **Text Extraction** (LangChain PDFLoader)
- **Chunking** (RecursiveCharacterTextSplitter)
- **Embeddings** (HuggingFace API)
- **Vector Storage** (Pinecone)
- **Conversational Search** with your PDFs

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shivam003a/pdftalk.git
cd pdftalk

```

### 2️⃣ Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 🔑 Environment Variables

#### Set environment variable in both /client and /server

### ▶️ Running the App

```bash
cd server
npm run dev

cd client
npm start

```

---

## 🔄 How It Works

1. **User uploads PDF** → Sent to the **server** via Multer.
2. **PDF stored in Cloudinary** for secure and scalable storage.
3. **Text extracted** using **LangChain's PDFLoader**.
4. **Text split into chunks** with **RecursiveCharacterTextSplitter** for better embedding performance.
5. **Each chunk embedded** via **HuggingFace API** (e.g., `all-MiniLM-L6-v2`).
6. **Embeddings stored in Pinecone** for fast similarity search.
7. **Chat queries** are embedded and used to search Pinecone for the most relevant chunks.
8. **Chunks + query passed to LLM** to generate a final, context-aware response.

---

## 🛠 Tech Stack

### **Frontend**

- **React** (or **Next.js**) – UI framework
- **Tailwind CSS** – Styling
- **Axios** – API requests

### **Backend**

- **Node.js + Express** – REST API server
- **Multer** – File upload handling
- **Cloudinary SDK** – PDF storage
- **LangChain** – PDF text extraction & chunking
- **HuggingFace API** – Text embeddings
- **Pinecone Vector DB** – Vector storage & similarity search
