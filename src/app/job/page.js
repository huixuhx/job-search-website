import JobSearch from "@/components/JobSearch";
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
            {/* Back to Home Button */}
            <Link href="/tool"  prefetch={false} className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>
      <JobSearch />


    </div>
  );
}