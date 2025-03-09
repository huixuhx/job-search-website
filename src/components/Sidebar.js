"use client";
import Link from "next/link";

export default function Sidebar({ links }) {
  return (
    <nav className="w-full h-screen bg-gray-900 text-white p-6">
      <Link href="/">
        <h2 className="text-xl font-bold mb-4">Hui&apos;s ToolBox</h2>
        <img src="dog.gif" alt="Animated GIF" width={64} height={64} />
      </Link>

      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index} className="w-full">
            <a
              href={link.href}
              className="block w-full p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition 
                         whitespace-nowrap overflow-hidden truncate"
              title={link.label} // Show full text on hover
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
