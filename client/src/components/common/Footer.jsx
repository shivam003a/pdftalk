import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-primary">
            <footer className='max-w-[1200px] mx-auto flex flex-col items-center justify-center py-8'>
                <p className='font-poppins text-white text-sm'>&copy; {new Date()?.getFullYear()} pdfTalk. All rights reserved.</p>
                <div className='flex mt-4 gap-5'>
                    <NavLink to="https://instagram.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={22} color='#E1306C' />
                    </NavLink>
                    <NavLink to="https://x.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={22} color='#1DA1F2' />
                    </NavLink>
                    <NavLink to="https://linkedin.com/in/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={22} color='#0077B5' />
                    </NavLink>
                    <NavLink to="https://github.com/shivam003a" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={22} color='#333333' />
                    </NavLink>
                </div>
            </footer>
        </div>
    );
}

export default Footer;