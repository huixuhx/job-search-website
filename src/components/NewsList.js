"use client";
import { useEffect, useState } from "react";

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch("/api/news");
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error("Error fetching news:", error);
                setNews([]); // Ensure `news` is always an array
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    if (loading) return <p>Loading news...</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(news) && news.length > 0 ? (
    news.map((item, index) => (
        <a href={item.link} target="_blank" key={item.link} rel="noopener noreferrer" 
           className="block bg-gray-900/70 shadow-lg hover:shadow-xl transition rounded-lg p-4 border border-gray-700 hover:border-blue-500 hover:ring-2 hover:ring-blue-400">
            <div>
                <p className="text-xs font-semibold text-gray-300 bg-gray-700 px-2 py-1 rounded-md inline-block mb-2">
                    {new Date(item.pubDate).toLocaleDateString()}
                </p>
                <h3 className="text-xl font-bold text-white hover:text-blue-400 transition">
                    {item.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    {item.description}
                </p>
            </div>
        </a>
    ))
) : (
    <p className="text-gray-500">No news available.</p>
)}
    </div>
    );
}