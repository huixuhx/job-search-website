"use client";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AdvancedCircularGallery() {
  const cards = Array.from({ length: 12 }, (_, i) => ({ index: i }));
  const controls = useAnimation();
  const [angle, setAngle] = useState(0);
  const cardAngle = 360 / cards.length; // 每张卡片间隔的角度
  const [startX, setStartX] = useState(null); // 记录拖拽起始位置

  // 旋转到目标角度
  const rotate = (direction) => {
    const newAngle =
      direction === "next" ? angle - cardAngle : angle + cardAngle;
    setAngle(newAngle);
    controls.start({
      rotateY: newAngle,
      transition: { duration: 1, ease: "easeInOut" },
    });
  };

  // 处理用户点击某张卡片
  const handleCardClick = (index) => {
    const clickedCardAngle = index * cardAngle; // 计算点击的卡片角度
    const relativeAngle = (clickedCardAngle + angle) % 360; // 计算相对角度

    if (relativeAngle > 0 && relativeAngle < 180) {
      rotate("next"); // 点击右侧，切换到下一张
    } else if (relativeAngle > 180 || relativeAngle === 0) {
      rotate("prev"); // 点击左侧，切换到上一张
    }
  };

  // 处理鼠标拖拽开始
  const handleDragStart = (event) => {
    setStartX(event.clientX);
  };

  // 处理鼠标拖拽结束
  const handleDragEnd = (event) => {
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    if (deltaX > 50) {
      rotate("prev"); // 向右拖动，查看上一张
    } else if (deltaX < -50) {
      rotate("next"); // 向左拖动，查看下一张
    }
    setStartX(null);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen  text-white"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      {/* 3D 透视容器 */}
      <div className="relative w-64 h-64" style={{ perspective: "2000px" }}>
        <motion.div
          className="relative flex justify-center items-center w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center",
          }}
          animate={controls}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {cards.map((item, index) => {
            const cardRotation = index * cardAngle;
            const relativeAngle = (cardRotation + angle) % 360;

            // 让正面朝向用户的卡片为 0°，让对面的卡片侧面
            const adjustedRotation =
              relativeAngle === 0
                ? 0 // 正面卡片
                : relativeAngle === 180
                ? 90 // 背面卡片侧面
                : 90; // 其他卡片默认侧面
          
            return (
              <motion.div
                className="absolute w-40 h-56 bg-red-500 shadow-lg flex items-center justify-center text-white text-2xl font-bold rounded-lg cursor-pointer"
                key={index}
                style={{
                  transform: `rotateY(${cardRotation}deg) translateZ(300px) rotateY(${adjustedRotation}deg)`,
                }}
                onClick={() => handleCardClick(index)}
              >
                {index + 1}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
