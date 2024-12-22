import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Pattern } from "@/components/ui/pattern";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <Pattern variant="checkered" />

      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <a
              className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-xs shadow"
              href="/"
            >
              <span className="animate-shine rounded-full border bg-[linear-gradient(110deg,#ffffff,45%,#f1f1f1,55%,#ffffff)] bg-[length:200%_100%] px-2 py-[1px] text-[10px] text-foreground dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] dark:text-white">
                Welcome to the town of enjoyment!
              </span>
              
            </a>

            <div className="relative ">
            <h1 className="text-6xl font-bold">
              Explore movies, tv series, and animes!
            </h1>
            <img src="/paint-brush.svg" className="absolute xl:w-auto w-[80%] translate-y-[40%] md:top-[-32px] right-[10%] -z-10" />
            <p className="text-sm leading-6 text-muted-foreground z-10">
              EnjoyTown is a streaming platform for lazy people who like to
              <br />
              watch millions of movies, series and animes for free. Go down to
              watch
            </p>
            </div>
            <div className="flex gap-2 z-10">
              <Link href={`/changelog`}>
                <Button variant="outline">Changelog</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Hero />
    </>
  );
}
