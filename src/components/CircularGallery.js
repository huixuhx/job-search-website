"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  { color: "bg-red-500", label: "Red" },
  { color: "bg-yellow-500", label: "Yellow" },
  { color: "bg-blue-500", label: "Blue" },
  { color: "bg-green-500", label: "Green" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-purple-500", label: "Purple" },
  { color: "bg-red-500", label: "Red" },
  { color: "bg-yellow-500", label: "Yellow" },
  { color: "bg-blue-500", label: "Blue" },
  { color: "bg-green-500", label: "Green" },
  { color: "bg-purple-500", label: "Purple" },
];

export default function CircularGallery() {
  const [selected, setSelected] = useState(0); // 选中的索引
  const totalImages = images.length;
  const angleStep = 360 / totalImages; // 每张图片的角度间隔

  const handleNext = () => {
    setSelected((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    setSelected((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* 3D 圆柱体 */}
      <div
        className="relative w-64 h-64"
        style={{ perspective: "1200px" }} // 3D 透视
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center", // 让旋转中心固定
            transform: `rotateY(${-selected * angleStep}deg)`, // 旋转整个圆柱
          }}
          animate={{ rotateY: -selected * angleStep }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // 平滑动画
        >
          {images.map((item, index) => {
            const imgAngle = index * angleStep; // 计算每张图片的角度
            const isActive = index === selected; // 当前图片是否正对用户

            return (
              <motion.div
                key={index}
                className={`absolute w-40 h-56 ${item.color} shadow-lg flex items-center justify-center text-white text-2xl font-bold rounded-lg`}
                style={{
                  transformOrigin: "center", // 确保每张图片的旋转轴是固定的
                  transform: `rotateY(${imgAngle}deg) translateZ(250px) ${
                    isActive ? "rotateY(0deg)" : "rotateY(90deg)"
                  }`,
                }}
              >
                {item.label}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 控制按钮 */}
      <div className="flex mt-6 space-x-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
}