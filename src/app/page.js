import LogoItem from "@/components/LogoItem";
import NewsList from "@/components/NewsList";
export default function Home() {

  const jobSites = [
    { id: 1, name: "LinkedIn", url: "https://www.linkedin.com/jobs", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
    { id: 2, name: "Indeed Canada", url: "https://ca.indeed.com", icon: "/logos/Indeed_Logo_Blue.svg" },
    { id: 3, name: "Glassdoor Canada", url: "https://www.glassdoor.ca", icon: "/logos/glassdoor-ar21~bgwhite.svg" },
    { id: 4, name: "TalentEgg", url: "https://www.talentegg.ca/", icon: "/logos/talentEgg.png" },
    { id: 5, name: "Canada Job Bank", url: "https://www.jobbank.gc.ca/", icon: "/logos/jobbank.svg" },
    // { id: 6, name: "Tech Jobs Canada", url: "https://www.techjobs.ca/", icon: "https://www.techjobs.ca/favicon.ico" },
    { id: 6, name: "Van People", url: "https://www.vanpeople.com", icon: "/logos/vanpeople_logo.jpeg" },
    { id: 7, name: "Van Sky", url: "https://www.vansky.com", icon: "https://www.vansky.com/favicon.ico" }
];

const codingPracticeSites = [
  { id: 1, name: "LeetCode", url: "https://leetcode.com", icon: "/logos/leetcode.png" },
  { id: 2, name: "CodeWars", url: "https://www.codewars.com", icon: "/logos/codewars.png" },
  { id: 3, name: "NeetCode", url: "https://neetcode.io/", icon: "/logos/neetcode-io-logo.png"}
];
  
  const atsTools = [
    { id: 1, name: "Jobscan", url: "https://www.jobscan.co", icon: "/logos/jobscan.jpeg" },
    { id: 2, name: "ResumeWorded", url: "https://www.resumeworded.com", icon: "/logos/resumeworded.png" },
    { id: 3, name: "Teal Resume Builder", url: "https://www.tealhq.com/resume-builder", icon: "/logos/TealResumeBuilder.png" },
    // { id: 4, name: "Enhancv", url: "https://enhancv.com", icon: "https://d1eipm3vz40hy0.cloudfront.net/images/enhancv-social-image-1080x1080.png" },
    // { id: 5, name: "Zety Resume Builder", url: "https://zety.com/resume-builder", icon: "https://zety.com/img/favicons/favicon-256x256.png" }
  ];

  const resumeEditingTools = [
    { id: 1, name: "Overleaf", url: "https://www.overleaf.com", icon: "https://www.overleaf.com/favicon.ico" },
    { id: 2, name: "Typst", url: "https://typst.app", icon: "https://typst.app/favicon.ico" },
    { id: 3, name: "Canva", url: "https://www.canva.com/resumes/templates", icon: "https://www.canva.com/favicon.ico" },
    { id: 4, name: "Resumake", url: "https://resumake.io", icon: "https://resumake.io/favicon.ico" },
    { id: 5, name: "Resume.io", url: "https://resume.io", icon: "https://resume.io/favicon.ico" },
    { id: 6, name: "LaTeX Resume Templates", url: "https://www.latextemplates.com/cat/curricula-vitae", icon: "https://www.latextemplates.com/favicon.ico" },
    { id: 7, name: "VisualCV", url: "https://www.visualcv.com", icon: "https://www.visualcv.com/favicon.ico" }
];
const jobDescriptionTools = [
  { id: 1, name: "YAKE!", url: "https://github.com/LIAAD/yake", icon: "https://github.githubassets.com/favicons/favicon.png" },
  { id: 2, name: "TextRank", url: "https://github.com/davidadamojr/TextRank", icon: "https://github.githubassets.com/favicons/favicon.png" },
  { id: 3, name: "spaCy", url: "https://spacy.io", icon: "https://spacy.io/static/favicon.ico" },
  { id: 4, name: "WordClouds", url: "https://www.wordclouds.com", icon: "https://www.wordclouds.com/favicon.ico" },
  { id: 5, name: "Jason Davies Word Cloud", url: "https://www.jasondavies.com/wordcloud/", icon: "https://www.jasondavies.com/favicon.ico" },
  { id: 6, name: "TagCrowd", url: "https://tagcrowd.com", icon: "https://tagcrowd.com/favicon.ico" }
];
  return (
    <div className="space-y-32">
     <section id = "Jobs" className="bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
        <h2 className="text-2xl font-bold mb-4">Job Postings</h2>
        <div className="flex flex-wrap gap-4">
          {jobSites.map((site) =>(
            <LogoItem key={site.id} name={site.name} url={site.url} icon={site.icon} />
          ))}
        </div>
      </section>

      <section id = "Coding" className="bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
        <h2 className="text-2xl font-bold mb-4">Coding Practice</h2>
        <div className="flex flex-wrap gap-4">
          {codingPracticeSites.map((site) =>(
            <LogoItem key={site.id} name={site.name} url={site.url} icon={site.icon} />
          ))}
        </div>
      </section>

      <section id="ATS" className="bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
        <h2 className="text-2xl font-bold mb-4">ATS Optimization</h2>
        <div className="flex flex-wrap gap-4">
          {atsTools.map((tool) => (
            <LogoItem key={tool.id} name={tool.name} url={tool.url} icon={tool.icon} />
          ))}
        </div>
      </section>

      <section id="Resume" className="bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
        <h2 className="text-2xl font-bold mb-4">Resume Editor</h2>
        <div className="flex flex-wrap gap-4">
          {resumeEditingTools.map((tool) => (
            <LogoItem key={tool.id} name={tool.name} url={tool.url} icon={tool.icon} />
          ))}
        </div>
      </section>
      <section id="Keyword" className="bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
        <h2 className="text-2xl font-bold mb-4">Keyword Extraction</h2>
        <div className="flex flex-wrap gap-4">
          {jobDescriptionTools.map((tool) => (
            <LogoItem key={tool.id} name={tool.name} url={tool.url} icon={tool.icon} />
          ))}
        </div>
      </section>
     <section id="ImmigrationNews" className = "bg-transparent p-6 rounded-lg shadow-lg mb-2 ">
      <h2 className="text-2xl font-bold mb-4">Immigration News This Month</h2>
      <NewsList />
     </section>
    </div>
  );
}
