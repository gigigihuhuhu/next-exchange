"use client";

import { XIcon, NoticeIcon } from "@/components/icons";
import { useEffect, useState } from "react";

interface NoticeProps {
  className: string;
}
const Notice = ({ className }: NoticeProps) => {
  const [disableNotice, setDisableNotice] = useState<boolean>(false);
  const [notice, setNotice] = useState<string>("");

  useEffect(() => {
    setNotice("가상자산시장 변동성 확대에 따른 유의사항 안내");
  }, []);

  return (
    <div
      className={
        className +
        (disableNotice ? " overflow-hidden max-h-0 mt-[-0.5rem]" : "")
      }
    >
      <div className="py-1 px-4 font-bold flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <NoticeIcon></NoticeIcon>
          <p>{notice}</p>
        </div>
        <button onClick={() => setDisableNotice(true)}>
          <XIcon></XIcon>
        </button>
      </div>
    </div>
  );
};

export default Notice;
