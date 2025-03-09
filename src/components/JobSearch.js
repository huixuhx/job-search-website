// "use client";

// import { useState } from "react";

// export default function JobSearch() {
//   const [location, setLocation] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       // Replace with actual API URL
//       const response = await fetch(
//         "/api/jobs"
//       );
//       if (!response.ok) throw new Error("Failed to fetch jobs");
//       const data = await response.json();
//       setJobs(data.jobs);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Search for Jobs</h2>
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           placeholder="Location (e.g., Vancouver, BC)"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-1/2 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Keyword (e.g., Java, DevOps)"
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           className="w-1/2 p-2 border rounded"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p className="mt-4 text-blue-500">Loading...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       <div className="mt-6">
//         {jobs.length > 0 ? (
//           <ul className="space-y-4">
//             {jobs.map((job, index) => (
//               <li key={index} className="border p-4 rounded shadow">
//                 <h3 className="text-lg font-semibold">{job.title}</h3>
//                 <p className="text-gray-600">{job.company} - {job.locations}</p>
//                 <p className="text-sm text-gray-500">{job.date}</p>
//                 <p className="mt-2">{job.description.replace(/<b>|<\/b>/g, "")}</p>
//                 {job.salary && <p className="text-green-600 font-bold mt-1">{job.salary}</p>}
//                 <a
//                   href={job.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block mt-2 text-blue-600 hover:underline"
//                 >
//                   View Job
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           !loading && <p className="text-gray-500">No jobs found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";

export default function JobSearch() {
  const [location, setLocation] = useState("");
  const [keywords, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); 
  const [provider, setProvider] = useState("careerjet");
  

  // Function to fetch jobs based on location, keyword, and page
  const fetchJobs = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
 
      const response = await fetch(
        `/api/jobs?location=${location}&keywords=${keywords}&page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();

      setJobs(data.jobs);
      setTotalPages(data.pages);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user search
  const handleSearch = () => {
    if (!isValidInput(location) || !isValidInput(keywords)) {
      setValidationError("Please enter a more descriptive location and keyword (at least two words).");
      return;
    }
    setValidationError("");
    fetchJobs(1); // Start from page 1
  };
  // Function to check if input is valid (ensuring it's not empty)
  const isValidInput = (input) => input.trim().length > 0;

  // Update form validity state whenever inputs change
  useEffect(() => {
    setIsFormValid(isValidInput(location) && isValidInput(keywords));
  }, [location, keywords]);

  

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-900/70 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Search for Jobs</h2>

 {/* Search Inputs & Provider Selection */}
 <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Location (e.g., Vancouver, BC)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Keyword (e.g., Java Developer, DevOps Engineer)"
          value={keywords}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full md:w-1/2 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Provider Selection Dropdown */}
        {/* <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="w-full md:w-1/3 p-3 bg-gray-800 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="jooble">Jooble</option>
          <option value="indeed">Indeed</option>
          <option value="linkedin">LinkedIn</option>
        </select> */}

        <button
          onClick={handleSearch}
          disabled={!isFormValid}
          className={`w-full md:w-auto px-6 py-3 rounded-md transition ${
            !isFormValid
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Search
        </button>
      </div>

      {/* Validation Error Message */}
      {validationError && (
        <p className="mt-2 text-yellow-400 text-sm">{validationError}</p>
      )}

      {loading && <p className="mt-4 text-blue-500">Loading jobs...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Job Grid Display */}
      {!loading &&
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <a
              href={job.url}
              target="_blank"
              key={job.url}
              rel="noopener noreferrer"
              className="block bg-gray-800 shadow-lg hover:shadow-xl transition rounded-lg p-4 border border-gray-700 hover:border-blue-500 hover:ring-2 hover:ring-blue-400"
            >
              <div>
                {/* Job Date */}
                <p className="text-xs font-semibold text-gray-300 bg-gray-700 px-2 py-1 rounded-md inline-block mb-2">
                  {new Date(job.date).toLocaleDateString()}
                </p>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-white hover:text-blue-400 transition">
                  {job.title}
                </h3>

                {/* Company & Location */}
                <p className="text-sm text-gray-400 mt-1">
                  {job.company} - {job.locations}
                </p>

                {/* Job Description */}
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {job.description.replace(/<b>|<\/b>/g, "").substring(0, 150)}...
                </p>

                {/* Salary (if available) */}
                {job.salary && (
                  <p className="text-green-400 font-semibold mt-2">
                    {job.salary}
                  </p>
                )}
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500">No jobs available.</p>
        )}
      </div>
      }
    

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => fetchJobs(currentPage - 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ← Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => fetchJobs(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => fetchJobs(currentPage + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}