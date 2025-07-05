# 📄 pdfTalk — Chat with Your PDF

pdfTalk is a modern web application that allows users to upload a PDF and have natural language conversations with its content. Powered by vector embeddings, Pinecone vector database, and transformer models, it delivers contextual answers from your documents.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS
- **Backend**: Next.js API (API for file uploads and processing)
- **Embeddings**: Hugging Face `all-MiniLM-L6-v2`
- **Vector Store**: Pinecone
- **PDF Parsing**: `pdf-parse`

---

## 🧠 Features

- 📄 Upload any PDF
- 🧹 Chunk content intelligently (\~300 tokens)
- 🤖 Generate embeddings using Hugging Face
- 🧠 Store and query with Pinecone
- 💬 Chat interface to query PDF content (RAG-based)

---

<!-- ## 📂 Project Structure

```
/pdfTalk
│
├── /app                 → Next.js frontend (chat UI)
├── /routes              → Express.js API routes
│   └── upload.js        → Handles PDF upload, parsing, embedding, and Pinecone upsert
├── /uploads             → Temporary storage for PDFs
├── /utils               → Chunking, tokenizer helpers, etc.
├── .env                 → Environment variables (keys, Pinecone config)
└── README.md
``` -->

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/shivam003a/pdftalk.git
cd pdftalk
```

### 2. Install Dependencies

```bash
npm install
# or if using Yarn
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
HF_API_KEY=your_huggingface_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=your_index_name
PINECONE_ENVIRONMENT=your_environment_name
```

> ⚠️ You must create the Pinecone index beforehand or handle dynamic creation in your code.

---

## 💻 Running the App

```bash
npm run dev
```

---

## 🧪 How it Works (Overview)

1. User uploads a PDF.
2. Backend extracts text using `pdf-parse`.
3. Text is chunked (\~300 tokens using sentence logic).
4. Chunks are embedded via Hugging Face transformer model.
5. Embeddings are stored in Pinecone with a unique namespace.
6. User's chat queries are embedded and searched against relevant vectors.
7. Retrieved context is passed to an LLM for generating responses.

---

## 📸 Screenshots

> _(Insert screenshots of upload UI, chat interface, response flow)_

---

## 🙌 Credits

- Hugging Face Transformers
- Pinecone Vector DB
- LangChain-inspired logic
