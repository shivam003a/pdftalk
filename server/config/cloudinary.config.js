import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadToCloudinary = async (filePath, folder = 'pdftalk/') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'raw',
            folder,
        });

        // fs.unlinkSync(filePath)
        return result;
    } catch (e) {
        console.error(e)
        throw new Error(e?.message || 'Cloudinary upload failed')
    }
}

export default cloudinary;