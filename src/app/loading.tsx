import { LoadingIcon } from "@/components/icons";

export default function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500">
        <LoadingIcon />
      </div>
    </div>
  );
}
