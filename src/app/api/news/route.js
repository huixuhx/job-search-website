export const dynamic = "force-dynamic"; 
export async function GET() {
    const url = "http://hui-news-sv-dis.hui-tool-website-ns:8080";
    const dev_url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/news/immigration`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors", // Ensure CORS handling
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow all origins
                "Access-Control-Allow-Methods": "GET, OPTIONS", // Allow GET requests
                "Access-Control-Allow-Headers": "Content-Type"
            },
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", 
            },
            status: 500,
        });
    }
}
