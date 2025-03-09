import Sidebar from "@/components/Sidebar";
const navLinks = [
    { label: "Job Postings", href: "#Jobs" },
    { label: "Coding Practice", href:"#Coding"},
    { label: "ATS Optimization", href: "#ATS" },
    { label: "Resume Editor", href: "#Resume" },
    { label: "Keyword Extraction", href: "#Keyword" },
    { label: "Immigration News", href: "#ImmigrationNews" },
    // { label: "Section 3", href: "#Resume" },
  ];
export default function ToolPageLayout({ children }) {
  return (
<div className="flex">
  <div className="w-full flex flex-col md:flex-row">
    {/* Sidebar for homepage only */}
    <aside className="w-1/6 min-w-[200px] bg-gray-900 text-white p-6 hidden md:block">
      <Sidebar links={navLinks} />
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6">{children}</main>
  </div>
</div>
  );
}