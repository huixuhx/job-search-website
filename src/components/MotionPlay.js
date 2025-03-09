"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
export function MotionPlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 10 }}
      className="bg-blue-500 p-4 text-white"
    >
      Hello, I&apos;m a motion div!
    </motion.div>
  );
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function AnimatedList() {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      {[1, 2, 3].map((item) => (
        <motion.li
          key={item}
          variants={itemVariants}
          className="bg-gray-200 p-2"
          whileHover={{ scale: 1.1, backgroundColor: "#ffcc00" }}
        >
          Item {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function CodeBlock() {
  return (
    <motion.pre
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white p-4 rounded-md"
    >
    </motion.pre>
  );
}

const dynamicFade = (delay = 0) => ({
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 10, delay } },
});

export function DynamicFade({ delay }) {
  return (
    <motion.div
      variants={dynamicFade(delay)}
      initial="hidden"
      animate="visible"
      className="w-32 h-32 bg-red-500"
    />
  );
}

const jobs = [
  { code: "101", name: "Software Engineer" },
  { code: "102", name: "Data Scientist" },
  { code: "103", name: "Product Manager" },
  { code: "104", name: "UX Designer" },
  { code: "105", name: "Cybersecurity Analyst" },
];

export function JobCarousel({config}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Always switch forward
      setIndex((prev) => (prev + 1) % jobs.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function handleDragEnd(event, info) {
    const deltaY = info.offset.y;

    if (deltaY < -30) {
      // Dragged UP → Next Job (Flip Up)
      setDirection(1);
      setIndex((prev) => (prev + 1) % jobs.length);
    } else if (deltaY > 30) {
      // Dragged DOWN → Previous Job (Flip Down)
      setDirection(-1);
      setIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
    }
  }

  return (
    <div className={config}>
      {/* Job Name Container (Relative for Positioning) */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={jobs[index].name}
          layout // ✅ Makes sure the element maintains size during animation
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full text-center md:text-left cursor-grab active:cursor-grabbing"
        >
          <div className="text-xl font-bold text-green-300">
            {jobs[index].name + "."}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const blogList = [
  { index: 0, title: "ALL IN ONE JOB SEARCH BOARD!", content: "xxx" , link:"/job"},
  { index: 1, title: "JOB SEARCH TOOLBOX!", content: "xxxxxx", link:"/tool" },
//   { index: 2, title: "xxxxxxxxxxxx", content: "xxxxxxxx" },
//   { index: 3, title: "xxxxxxxx", content: "xxxxxxxxxxx" },
];
const listAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 3.5, staggerChildren: 0.2 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export function BlogList({ className }) {
  return (
    <div className={`${className}`}>
      <motion.ul
        variants={listAnimation}
        initial={"hidden"}
        animate={"visible"}
      >
        {blogList.map((item, index) => (
          <motion.li
            key={index}
            variants={itemAnimation}
            className="relative p-2 m-3 rounded-lg bg-white/20 backdrop-blur-sm transition-all duration-300"
            whileHover={{
              scale: 1.1,
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          >
            {index === 0 || index === 1 ? (
              <>
                {/* <Image
                  src="/news.svg"
                  width={16}
                  height={16}
                  alt="news"
                  className="absolute -top-1 -left-1"
                /> */}
                <motion.div
                  initial={{rotate: -20 }}
                  animate={{ scale:1.2 }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute -top-2 -left-2 flex text-red-500 text-md font-bold"
                  // style={{
                  //   transform: "rotateZ(-30deg)",
                  // }}
                >
                 NEW!! 
                </motion.div>

                <Link href={item.link}  prefetch={false}>
                  <h2 className="text-xl font-bold text-green-300">
                    {item.title}
                  </h2>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-green-300">
                  {item.title}
                </h2>
                <p>{item.content}</p>
              </>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
