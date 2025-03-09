import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCode,
} from "react-icons/fa";
import EarthScene from "@/components/journey/EarthScene";
import AdvancedCircularGallery from "@/components/AdvancedCircularGallery";
import News from "@/components/BlogList";
import {
  AnimatedList,
  MotionPlay,
  CodeBlock,
  DynamicFade,
  JobCarousel,
  JobCubeScroller,
  BlogList,
} from "@/components/MotionPlay";
import TechStack from "@/components/TechStack";
export default function Home() {
  return (
    <>
      <div className="relative flex flex-col md:block h-full gap-4 bg-[radial-gradient(#182b34,#2d1d34)] md:block w-full md:h-screen ">
        <div className="container my-2 md:my-0 md:absolute flex flex-col mx-auto md:top-10 z-100 md:left-10 md:mx-0 md:ml-5 space-y-2 pointer-events-none select-none">
          <div className="w-24 h-24 mx-auto md:mx-0 md:h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <Image
              src="/avatar.jpeg"
              width={96}
              height={96}
              alt="Avatar"
              priority
              className="object-cover object-top w-full h-full scale-150 -translate-y-1 translate-x-1"
            />
          </div>
          {/* 第一行：名字 */}
          <div className="flex flex-col mx-auto my-2 md:my-0 md:mx-0 md:block">
            <span className="text-md md:text-sm text-gray-300">
              My name is{" "}
            </span>
            <span className="text-xl font-bold">Hui Xu.</span>
          </div>

          {/* 第二行：网站介绍 */}

          <div className="flex flex-col mx-auto md:mx-0 md:block">
            <span className="text-md md:text-sm text-gray-300 text-center md:text-left">
              I am a{" "}
            </span>
            <span className="text-xl font-bold">Software Engineer, </span>
          </div>

          <div className="flex flex-col mx-auto md:flex-row md:mx-0 md:items-baseline md:space-x-1 pointer-events-auto">
            <span className="text-md md:text-sm text-gray-300 text-center md:inline-block md:text-left">
              But I am also a(n){" "}
            </span>
            <JobCarousel config="relative h-8 min-w-[300px] py-3 items-center justify-center" />
          </div>
          <div className="mt-3 flex flex-col mx-auto md:mx-0 md:block">
            <span className="text-md md:text-sm text-gray-300 text-center md:text-left">
              I live in{" "}
            </span>
            <span className="text-xl font-bold">British Columbia, Canada.</span>
          </div>
          <p className="text-sm text-gray-300 text-center md:text-left">
            Welcome to my Website!
          </p>
          {/* 第三行：社交平台图标 */}
          <div className="flex space-x-4 mt-2 mx-auto md:mx-0 pointer-events-auto">
            <Link href="https://github.com/huixuhx" passHref legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-2xl text-gray-300 hover:text-white hover:scale-110 transition-transform transform-gpu duration-200"
              >
                <FaGithub />
              </a>
            </Link>
            <Link
              href="https://www.linkedin.com/in/huixuhx"
              passHref
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-2xl text-blue-500 hover:text-blue-400 hover:scale-110 transition-transform transform-gpu duration-200"
              >
                <FaLinkedin />
              </a>
            </Link>
            <a
              href="mailto:huixuhx@outlook.com"
              className="inline-flex items-center justify-center text-2xl text-gray-300 hover:text-white hover:scale-110 transition-transform transform-gpu duration-200 pointer-events-auto"
            >
              <FaEnvelope />
            </a>
            <Link
              href="https://leetcode.cn/u/bravado-9"
              passHref
              legacyBehavior
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-2xl text-yellow-400 hover:text-yellow-300 hover:scale-110 transition-transform transform-gpu duration-200"
              >
                <FaCode />
              </a>
            </Link>
          </div>
        </div>

        {/* ✅ 右侧 Journey List */}
        <div className="container md:absolute container z-100 md:top-0 md:right-0 md:w-3/10 md:backdrop-blur-xs md:bg-opacity-20 md:p-4 rounded-lg pointer-events-auto">
          <BlogList className={"relative  overflow-visible "} />
        </div>

        <div className="hidden md:block">
          <EarthScene />
        </div>
        <TechStack />
      </div>
    </>
  );
}
