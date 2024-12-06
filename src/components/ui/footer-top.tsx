import { footerData } from "@/data/sample-data";
import Link from "next/link";
import { GithubIcon, LeetcodeIcon } from "../icons";

export default function FooterTop() {
  return (
    <div className="w-full py-10 px-14 border-t border-solid border-gray-200 flex flex-row justify-between">
      <div className="grow grid grid-cols-4">
        {footerData.map((data, index1) => (
          <div key={index1} className="text-sm">
            <h1 className="font-bold mb-4">{data.category}</h1>
            <div className="flex flex-col gap-2">
              {data.links.map((link, index2) => (
                <Link key={index2} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="basis-36 flex flex-row items-start justify-end *:w-[24px] *:[h-24px] *:rounded-full gap-4">
        <Link href="https://github.com/gigigihuhuhu/next-transaction">
          <GithubIcon fill="gray"></GithubIcon>
        </Link>
        <Link
          href="https://leetcode.com/u/gigigihuhuhu/"
          className="bg-[gray] invert"
        >
          <LeetcodeIcon></LeetcodeIcon>
        </Link>
      </div>
    </div>
  );
}
