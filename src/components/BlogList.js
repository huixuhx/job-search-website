"use client";

import Image from "next/image";
import { useContext } from "react";
import NewsSvg from '/public/news.svg'
// import { newsData } from "~/src/components/journey/data/newsData";


const News = () => {

const newsData = []
  return (
    <>
      {/* Title Section */}
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 mr-2">
        <img src="/news.svg" alt="News Icon" className="w-8 h-8" />
        </div>
        <div className="text-white text-lg font-bold">NEWS</div>
      </div>

      {/* News List */}
      <div className="overflow-scroll h-full pr-5 scrollbar-hide">
        {newsData.map((news) => (
          <div
            key={news.index}
            className="mb-8 cursor-pointer group"
            onClick={() =>
              setSelectedNews(
                selectedNews == null || selectedNews !== news.index
                  ? news.index
                  : null
              )
            }
          >
            {/* Country Info */}
            <div className="flex items-center mb-1">
              <Image
                src={`/journey/flag/${news.country}.svg`}
                width={15}
                height={25}
                alt={`${news.country} flag`}
              />
              <div className="ml-2 text-sm font-bold text-green-500">
                {news.country}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex justify-between items-start">
              {/* Title */}
              <div
                className={`text-xl font-bold select-none mr-2 transition-all ${
                  news.index === selectedNews
                    ? "text-green-500"
                    : "text-white group-hover:text-green-500"
                }`}
              >
                {news.title}
              </div>

              {/* Country Image */}
              <div className="min-w-[50px]">
                <Image
                  src={`/journey/country/${news.country}.png`}
                  width={50}
                  height={50}
                  className="rounded-lg"
                  alt={`${news.country}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;