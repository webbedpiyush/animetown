import { siteConfig } from "@/config/site";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { jetBrainsMono } from "@/app/layout";

export function SiteHeader() {
  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${jetBrainsMono.className}`}>
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            {/* <div>Search</div> */}
            <Link href={siteConfig.links.github} target="_blank">
              <div className={cn(buttonVariants({variant:"ghost"}),'w-9 px-0')}>
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target="_blank">
              <div className={cn(buttonVariants({variant:"ghost"}),'w-9 px-0')}>
                <Twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
