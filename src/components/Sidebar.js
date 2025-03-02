"use client"
export default function Sidebar({ links }) {
    return (
      <nav className="w-1/6 h-screen bg-gray-900 text-white p-6 fixed">
        <h2 className="text-xl font-bold mb-4">Hui&apos;s ToolBox</h2>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="block p-2 hover:bg-gray-700 rounded">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }