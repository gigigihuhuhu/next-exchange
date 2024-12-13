"use client";

import { AngleNextIcon } from "@/components/icons";

export default function Links() {
  const handleClick = (src:string) => {
    window.open(src, "_blank");
  };
  return (
    <div className="flex flex-row gap-8 items-center justify-start pl-20 pt-5">
      <div className="text-3xl font-semibold">Not yet!</div>
      <button
        onClick={() => handleClick("https://github.com/gigigihuhuhu/next-exchange/commits/main/")}
        className="group transition-colors duration-200 text-lg text-gray-900 font-semibold px-4 py-2 border border-solid border-blue-300 rounded-xl hover:border-blue-700 hover:bg-blue-100 flex flex-row items-center"
      >
        Github 소스코드 보러가기
        <AngleNextIcon className="transition-transform duration-200 group-hover:translate-x-1"></AngleNextIcon>
      </button>
      <button
        onClick={() => handleClick("https://portfolio.kyungsu.com")}
        className="group transition-colors duration-200 text-lg text-gray-900 font-semibold px-4 py-2 border border-solid border-red-300 rounded-xl hover:border-red-700 hover:bg-red-100 flex flex-row items-center"
      >
        포트폴리오 보러가기
        <AngleNextIcon className="transition-transform duration-200 group-hover:translate-x-1"></AngleNextIcon>
      </button>
    </div>
  );
}
