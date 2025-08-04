import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            dbName: 'PDF_TALK_TEST'
        })
        console.log(`Connect to: ${conn.connection.host}`)
    } catch (e) {
        console.log('Error connecting DB')
        process.exit(1)
    }
}