import { jetBrainsMono } from "@/app/layout";
import { Clapperboard, GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className={`${jetBrainsMono.className} mx-auto overflow-hidden rounded-lg shadow:sm lg:mb-4 lg:border max-w-6xl`}>
      <div className="border-t p-4">
        <div className="mx-auto flex flex-col md:flex-row md:items-center md:justify-between max-w-6xl md:gap-0">
          <div className="flex items-center gap-2">
            <Clapperboard size={20} />
            <h2 className="text-md font-normal">AnimeTown</h2>
          </div>

          <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()}-
                {Number(new Date().getFullYear()) + 1} webbedpiyush
              </p>
           
            <div className="h-3 border-r"/>

            <span className="text-xs text-muted-foreground">Data provided by Consumet and Tmdb API</span>
          </div>

          <div className="flex items-center gap-2 [&_a]:rounded-full [&_a]:border [&_a]:px-3 [&_a]:py-1 [&_a]:shadow">
            <Link href="https://github.com/webbedpiyush">
              <GithubIcon />
            </Link>

            <Link href="https://x.com/_webbedpiyush">
              <TwitterIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
