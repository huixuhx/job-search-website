export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 border-t border-gray-700 p-4 flex flex-col items-center">
            <div className="text-sm">© {new Date().getFullYear()} <a href ="">Hui&apos;s ToolBox.</a> All rights reserved.</div>
            {/* <div className="mt-2 flex space-x-4">
                <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
                <a href="/terms" className="hover:text-white transition">Terms of Service</a>
                <a href="/contact" className="hover:text-white transition">Contact</a>
            </div> */}
        </footer>
    );
}