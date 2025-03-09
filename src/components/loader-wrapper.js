"use client"; // 让 `useState` 运行在客户端

import { useState, useEffect } from "react";
import Loader from "@/components/Loading";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const LoaderWrapper = ({ children }) => {
  const [fadeOut, setFadeOut] = useState(false); // 控制渐变消失
  const [isLoading, setIsLoading] = useState(true); // 控制最终隐藏

  const pathname = usePathname(); // Detects page changes


  const loadingEffect = () => {
    // ✅ 让 `Loader` 至少显示 2 秒钟
    const timer1 = setTimeout(() => {
      setFadeOut(true); // 开始渐变消失
    }, 3000);

    // ✅ 让 `Loader` 在渐变 0.5 秒后完全隐藏
    const timer2 = setTimeout(() => {
      setIsLoading(false);

    }, 4000);

;
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);

    };
  };
  useEffect(() => {
    // Listen for route changes (page navigation)

    setFadeOut(false);
    setIsLoading(true);
    console.log(pathname);
    loadingEffect();
  }, [pathname]);

  return (
    <>
      {isLoading ? (<Loader fadeOut={fadeOut} />) :null }

    </>
  );
};

export default LoaderWrapper;
