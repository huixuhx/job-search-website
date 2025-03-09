import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoaderWrapper from "@/components/loader-wrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Search",
  description:
    "Looking for a job in Canada? My platform offers essential tools for job seekers, including job postings, coding practice, ATS resume optimization, resume editor, keyword extraction, and immigration news. Get ahead in your job search with AI-powered insights and career guidance.",
  keywords:
    "job search tools, ATS resume optimization, resume editing, job posting Canada, keyword extraction for resumes, coding practice, job search Canada, software engineer job search, resume ATS checker, immigration news Canada, job application optimization, technical interview practice, job hunting tools, career advice for international students, new graduate job search, best resume editor",
  icons: {
    icon: "/icon.png", // 你也可以换成 PNG 或 SVG，如 "/favicon.png"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className="antialiased flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <LoaderWrapper />
            <main className="p-0 flex-grow">{children}</main>
        {/* Footer Always at Bottom */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
