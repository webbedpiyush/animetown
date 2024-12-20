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
              <h1 className="text-6xl font-bold">
                Explore movies, tv series, and animes!
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                EnjoyTown is a streaming platform for lazy people who like to
                <br />
                watch millions of movies, series and animes for free. Go down to
                watch
              </p>
              <div className="flex gap-2">
                <Link href={`/changelog`}>
                  <Button variant="outline">Changelog</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      {/* <HeroSection /> */}
    </>
  );
}
