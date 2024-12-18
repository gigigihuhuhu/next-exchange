import LocaleButton from "./locale-button";

export default function LocaleButtons() {
  return (
    <div className="pl-2 flex flex-row items-center text-xs">
      <LocaleButton label="EN" locale="en"></LocaleButton>
      <p className="mx-1 text-gray-500">|</p>
      <LocaleButton label="KO" locale="ko"></LocaleButton>
    </div>
  );
}