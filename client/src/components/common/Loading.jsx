export default function Loading() {
    return (
        <>
            <div className="h-screen w-screen overflow-hidden bg-primary flex justify-center items-center">
                <img
                    src="/pdftalk.png"
                    alt="pdftalk"
                    width={200}
                    height={200}
                    className='animate-bounce'
                />
            </div>
        </>
    )
}