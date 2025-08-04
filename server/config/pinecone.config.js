import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})

export const upsertVectors = async (vectors, namespace) => {
    try {

        if (!Array.isArray(vectors) && !namespace) {
            throw new Error("Vectors must be an array and namespace must be provided")
        }

        const indexName = process.env.PINECONE_INDEX_NAME;
        const { indexes } = await pc.listIndexes()
        const indexNamesArray = indexes.map(i => i.name);


        if (!indexNamesArray.includes(indexName)) {
            await pc.createIndex({
                name: indexName,
                dimension: 384,
                spec: {
                    cloud: "aws",
                    region: "us-east-1"
                }
            })
        }

        const index = pc.Index(indexName)
        const upsertResponse = await index.namespace(namespace).upsert(vectors);
        return upsertResponse;

    } catch (e) {
        console.log(e)
        throw new Error(e?.message || 'Upserting to Pinecone Failed')
    }
}

export const searchPinecone = async (vector, namespace, topK = 5) => {
    try {
        if (!Array.isArray(vector) && !namespace) {
            throw new Error("Vectors must be an array and namespace must be provided")
        }
        const indexName = process.env.PINECONE_INDEX_NAME;
        const index = pc.Index(indexName)

        const result = await index.namespace(namespace).query({
            vector,
            topK,
            includeMetadata: true
        })

        return result.matches;
    } catch (e) {
        throw new Error(e?.message || "Failed to Query Pinecone")
    }
}

export const deletePineconeNamespace = async (namespace) => {
    try {
        const indexName = process.env.PINECONE_INDEX_NAME;
        const index = pc.Index(indexName)

        await index.namespace(namespace).deleteAll();
    } catch (e) {
        throw new Error(e?.message || "Erorr deleting namespace")
    }
}