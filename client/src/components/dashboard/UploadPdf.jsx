import { FileUp, Info, Loader } from "lucide-react"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../common/Loading"
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { getAllChats } from "../../redux/slices/chat.slices"

const maxSize = 3 * 1024 * 1024;

export default function UploadPdf() {
    const [file, setFile] = useState(null)
    const [isInDropZone, setIsInDropZone] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsInDropZone(true)
    }
    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsInDropZone(false)
    }


    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        setIsInDropZone(false)
        const file = e?.dataTransfer?.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error("File should be PDF")
            return;
        }
        if (file.size > maxSize) {
            toast.error('File size must be less than 3MB')
            return;
        }
        setFile(file)
        e?.dataTransfer.clearData();
    }

    const handleManualUpload = (e) => {
        inputRef?.current.click()
    }

    const handleFileInput = (e) => {
        e.preventDefault()

        const file = e?.target?.files[0]
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error("File should be PDF")
            return;
        }

        if (file.size > maxSize) {
            toast.error('File size must be less than 3MB')
            return;
        }
        setFile(file)
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        const toastId = toast.loading("Preparing File...")
        try {
            const formData = new FormData()
            formData.append('pdf', file)

            const response = await fetch(`${import.meta.env.VITE_BE_URI}/api/upload`, {
                method: "POST",
                headers: {
                    "Accept": 'application/json'
                },
                body: formData,
                credentials: 'include'
            })

            const body = await response.json()

            if (response.ok) {
                navigate(`/chat/${body?.data?._id}`, { replace: true })
                dispatch(getAllChats())
                toast.success(body?.message)
                removeFile();
            } else {
                toast.error(body?.message)
            }
        } catch (e) {
            setLoading(false)
        }
        setLoading(false)
        toast.dismiss(toastId)
    }

    const removeFile = () => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = null;
        }
    }

    return (
        <>
            <div className="w-full h-full flex justify-center items-center p-2">
                <div className="w-full sm:w-120 p-4 bg-off-white rounded-lg">
                    {/* text header */}
                    <div className="font-poppins text-primary text-sm mb-4">Add your file or document here</div>

                    {/* Drag Drop Component */}
                    <div
                        className={`w-full h-50 border-2 border-dotted ${isInDropZone ? "border-s-text" : 'border-primary'} rounded-lg flex flex-col justify-center items-center`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {
                            loading ? (
                                <div className="flex flex-col justify-center items-center">
                                    <Loader className="animate-spin" strokeWidth={1} />
                                    <p className="text-sm text-gray-400 animate-pulse">
                                        Preparing your file… This might take a minute. Please wait.
                                    </p>
                                </div>
                            ) : (
                                <div>{
                                    file ? (
                                        <div className="flex gap-2 justify-center items-center flex-wrap text-center" >
                                            <span className="font-poppins text-primary text-sm">Selected pdf: </span>
                                            <span className="font-poppins text-sm text-blue-500 underline">{file.name}</span>
                                            <span className="font-poppins text-sm text-blue-500 cursor-pointer" onClick={removeFile}>X</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col justify-center items-center">
                                            <div>
                                                <FileUp
                                                    size={48}
                                                    color="#001b2e"
                                                    strokeWidth={1}
                                                    className="mb-2"
                                                />
                                            </div>
                                            <div className="font-poppins text-primary text-sm">Drop your file here, <span className="underline text-blue-500 cursor-pointer" onClick={handleManualUpload}>or click to browse</span></div>
                                        </div>
                                    )}</div>
                            )
                        }
                        <input
                            ref={inputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileInput}
                            hidden
                        />
                    </div>

                    {/* Supported file info */}
                    <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center justify-center gap-1 text-gray">
                            <Info size={14} />
                            <span className="font-poppins text-xs">Supported files: .pdf</span>
                        </div>
                        <div className="font-poppins text-xs text-gray">Maximum size: 3MB</div>
                    </div>

                    {/* upload btn */}
                    <button className="w-full px-1 py-2 bg-primary mt-4 rounded-lg text-off-white font-poppins text-sm disabled:bg-primary/70 flex justify-center cursor-pointer"
                        onClick={handleUpload}
                        disabled={!file}
                    >
                        {loading ? (<Loader strokeWidth={1} size={16} className="animate-spin" />) : ('Continue')}
                    </button>

                </div>
            </div>
        </>
    )
}