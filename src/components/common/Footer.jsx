import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import Link from 'next/link'

function Footer() {
    return (
        <div className="bg-primary">
            <footer className='max-w-[1200px] mx-auhref flex flex-col items-center justify-center py-8'>
                <p className='font-poppins text-white text-sm'>&copy; {new Date()?.getFullYear()} pdfTalk. All rights reserved.</p>
                <div className='flex mt-4 gap-5'>
                    <Link href="https://instagram.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={22} color='#E1306C' />
                    </Link>
                    <Link href="https://x.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={22} color='#1DA1F2' />
                    </Link>
                    <Link href="https://linkedin.com/in/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={22} color='#0077B5' />
                    </Link>
                    <Link href="https://github.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={22} color='#333333' />
                    </Link>
                </div>
            </footer>
        </div>
    );
}

export default Footer;