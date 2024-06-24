import { BsYoutube } from "react-icons/bs";
import { Antonio } from "next/font/google";
import { cn } from "@/lib/utils";

const antonio = Antonio({
  subsets: ["latin"],
});

export default function YouTubeTextMark() {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 lg:items-start items-center pointer-events-none select-none",
        antonio.className
      )}
    >
      <BsYoutube className="text-red-500 lg:h-10 lg:w-10 h-6 w-6" />
      <span className="lg:text-3xl text-lg font-semibold">YouTube</span>
    </div>
  );
}
