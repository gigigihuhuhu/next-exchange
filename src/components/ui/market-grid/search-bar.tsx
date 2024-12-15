import React, { useRef } from "react";
import Image from "next/image";
import { SettingsIcon, XIcon } from "@/components/icons";

export default function SearchBar({
  setSearchKeyword,
}: {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="pl-3 pr-3 border-b border-gray-200">
      <div className="flex flex-row items-center gap-2 h-[42px]">
        <div className="relative grow w-full">
          <input
            ref={inputRef}
            className="w-full placeholder-gray-500 placeholder:text-xs rounded-sm focus:placeholder-transparent"
            type="text"
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="코인명/심볼검색"
          />
          <button className={"absolute right-[1px] top-[2px]"+
            (inputRef.current?.value ? "" : " hidden")
          }>
            <XIcon></XIcon>
          </button>
        </div>
        <a>
          <Image
            src="https://cdn.kyungsu.com/samples/icons/SearchIcon.png"
            alt={"search-icon"}
            width={26}
            height={26}
          ></Image>
        </a>
        <div className="border-l border-gray-200">
          <button className="pt-3 pb-3 pl-3">
            <SettingsIcon></SettingsIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
