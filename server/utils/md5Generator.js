import md5File from 'md5-file'

export const calculateMD5Hash = async (filePath) => {
    return await md5File(filePath)
}