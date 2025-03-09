'use client'
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiSpringboot, SiNodedotjs, SiDocker, SiKubernetes ,SiMysql,SiDotnet,SiPython,SiMongodb } from "react-icons/si";
import { motion } from "framer-motion";
import { FaAws , FaJava,FaGit,FaHtml5,FaCss3} from "react-icons/fa";
import { DiRedis } from "react-icons/di";
const techStack = [
    // 编程语言
    { name: "Java", icon: <FaJava className="text-orange-500" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { name: "Python", icon: <SiPython className="text-blue-400" /> },
  
    // 前端框架 & 库
    { name: "React", icon: <SiReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-gray-200" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <FaCss3 className="text-blue-500" /> },
  
    // 后端框架 & 运行时
    { name: "Spring Boot", icon: <SiSpringboot className="text-green-500" /> },
    { name: "Dotnet", icon: <SiDotnet className="text-purple-400" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-400" /> },
  
    // 数据库 & 缓存
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "Redis", icon: <DiRedis className="text-red-500" /> },
  
    // DevOps & 云计算
    { name: "Git", icon: <FaGit className="text-red-500" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-300" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="text-blue-500" /> },
    { name: "AWS", icon: <FaAws className="text-yellow-500" /> },
  ];

export default function TechStack() {
  return (
    <div className="container mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2 w-2/3 md:py-6 bottom-0 flex justify-center">
 <div className="relative w-full overflow-hidden py-6 bottom-0 flex items-center space-x-4">

 <motion.div
      className="flex w-max gap-4 flex-nowrap"
      animate={{ x: ["0%", "-50%"] }} // ✅ 滚动完整的列表长度
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      {/* ✅ 渲染两次，确保滚动时无缝衔接 */}
      {[...techStack, ...techStack].map((tech, index) => (
        <div
          key={index}
          className="w-8 h-8 p-2 rounded-lg flex items-center justify-center"
        >
          {tech.icon}
        </div>
      ))}
    </motion.div>
    </div>
    </div>
  );
}