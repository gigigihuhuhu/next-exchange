import { footerText, copyright } from "@/data/sample-data";

export default function FooterBottom() {
  return (
    <div className="px-14 flex flex-col">
      <div className="flex flex-row flex-wrap pt-5 border-t border-solid border-gray-200">
        {footerText.split("|").map((text, index) => {
          return (
            <div
              key={index}
              className="text-sm text-gray-700 font-medium flex flex-row py-2"
            >
              <p>{text}</p>
              <span className="mx-2 text-gray-200">|</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-gray-700 font-medium pb-5">{copyright}</div>
    </div>
  );
}
