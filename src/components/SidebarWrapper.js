"use client"; // Now this runs on the client side

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function SidebarWrapper({links}) {
  const pathname = usePathname(); // Get the current route

  // Hide sidebar only on /jobs page
  if (pathname === "/jobs") {
    return null; // Do not render anything
  }

  return (
    <div className="w-[15%] min-h-screen bg-gray-900">
      <Sidebar links={links} />
    </div>
  );
}