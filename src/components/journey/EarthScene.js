'use client'
import { createContext, useEffect, useRef, useState } from "react";
import ServiceJourney from "@/components/journey/ServiceJourney";
import styled, { css } from "styled-components";
// import News from "~/src/pages/journey/news";
// import NewsModal from "~/src/pages/journey/newsModal";

const EarthScene = () => {
  const appRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {

    new ServiceJourney(appRef, canvasRef);
  }, []);

  return (
     <Worldmap ref={appRef}>
        <Canvas ref={canvasRef} />
      </Worldmap>

  );
};

const Worldmap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  div[class^="desc-visible"] {
    font-family: "Quantico", sans-serif;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 20px;
    color: #00ffa7;
    box-shadow: 0 4px 16px 0 rgba(#00ffa7, 0.4);
    z-index: 1000;
  }

  div[class^="name-visible"] {
    font-family: "Segoe UI Black", sans-serif;
    font-size: 50px;
    font-weight: bold;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .name-visible0 {
    background: linear-gradient(45deg, #e20112, #fff);
  }
  .name-visible1 {
    background: linear-gradient(0deg, #e00011, #f8db09, #e00011);
  }
  .name-visible2 {
    background: linear-gradient(0deg, #c3102d, #fff, #012066);
  }
  .name-visible3 {
    background: linear-gradient(0deg, #f8c800, #d70000, #000);
  }
  .name-visible4 {
    background: linear-gradient(0deg, #e00011, #fff);
  }
  .name-visible5 {
    background: linear-gradient(0deg, #ffd500, #52c3f1);
  }

  img[class^="pic-visible"] {
    object-fit: cover;
    border-radius: 50%;
    filter: brightness(80%);
    background: #1d2739;
    border: white 5px solid;
    box-shadow: 0 4px 16px 0 rgba(0, 255, 167, 0.4);
  }

  img[class^="flag-visible"] {
    border-radius: 4px;
    z-index: 1000;
  }

  .pic-text {
    color: #fff;
    z-index: 100;
  }
`;

const Canvas = styled.div`
  position: absolute;
  background-image: radial-gradient(#182b34, #2d1d34);
  ${({ openNewsModal }) =>
    openNewsModal !== null &&
    css`
      :before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100vh;
        backdrop-filter: blur(5px);
      }
    `}
`;

const NewsWrapper = styled.div`
  z-index: 2;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 20px;
  padding: 5px;
  max-width: 300px;
  @media screen and (max-width: 959px) {
    display: none;
  }
`;

const DarkFullScreen = styled.div`
  z-index: 0;
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  transition: opacity 2s;
  ${({ openNewsModal }) =>
    openNewsModal !== null &&
    css`
      background: rgba(40, 33, 52, 0.6);
      width: 100%;
      height: 100%;
      opacity: 1;
      transition: opacity 2s;
    `}
`;

export default EarthScene;