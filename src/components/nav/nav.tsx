import Link from "next/link";
import YouTubeTextMark from "../assets/textmark";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import { BsGithub, BsDiscord } from "react-icons/bs";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (v: string) => {
    router.push(`/search?q=${encodeURIComponent(v)}`);
  };

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <nav className="container flex justify-between gap-3 lg:gap-16 items-center my-2">
        <Link href="/">
          <YouTubeTextMark />
        </Link>
        <div className="flex-1">
          <div className="flex bg-secondary p-[0.1rem] rounded-full items-center">
            <Input
              className="rounded-full rounded-r-none border-none"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  if (searchQuery) onSearch(searchQuery);
                }
              }}
            />
            <div className="mx-5">
              <CiSearch
                className="h-8 w-8 text-primary"
                onClick={() => {
                  if (!searchQuery) return;
                  onSearch(searchQuery);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <BsGithub className="lg:h-7 lg:w-7 h-5 w-5" />
          <BsDiscord className="lg:h-7 lg:w-7 h-5 w-5" />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
