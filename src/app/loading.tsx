import { LoadingIcon } from "@/components/icons";

export default function Loading() {
  return (
    <div className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500">
      <LoadingIcon />
    </div>
  );
}
