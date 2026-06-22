import { Link } from "react-router-dom"
import { branch } from "../../config"
const Footer = () => {
    return <>
        <footer className="bg-zinc-950 border-t border-zinc-900 w-full py-12 mt-auto">
            <div className="flex flex-col items-center justify-center space-y-6 max-w-[1280px] mx-auto">
                <div className="text-lg font-black text-zinc-200">{branch}</div>
                <div className="flex flex-wrap justify-center gap-8 px-4">
                    <Link className="font-inter text-xs text-zinc-500 hover:text-zinc-200 transition-colors" to="#">Privacy Policy</Link>
                    <Link className="font-inter text-xs text-zinc-500 hover:text-zinc-200 transition-colors" to="#">Terms of Service</Link>
                    <Link className="font-inter text-xs text-zinc-500 hover:text-zinc-200 transition-colors" to="#">Help Center</Link>
                    <Link className="font-inter text-xs text-zinc-500 hover:text-zinc-200 transition-colors" to="#">Contact Us</Link>
                </div>
                <div className="font-inter text-xs text-zinc-500 px-4 text-center">
                    © 2024 {branch}. Sản phẩm xây dưng cho mục đích học thuật.
                </div>
            </div>
        </footer>
    </>
}

export default Footer