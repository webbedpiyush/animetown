import { AnimeShow } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface CarouselCardProps {
  show: AnimeShow;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ show }) => {
  return (
    <>
      <div className="relative flex h-[70vh] md:hidden">
        <Image
          alt={show.title.userPreferred}
          className="inset-0 h-full w-full rounded-t-xl object-cover"
          src={show.image}
          width={500}
          height={500}
        />
        <div className="absolute bottom-0 top-1/2 flex w-full flex-col justify-between border-white bg-gradient-to-t from-background to-transparent">
          <div></div>
          <div className="flex flex-col items-center">
            <div className="flex w-9/12 items-center justify-center text-pretty text-center text-3xl font-bold">{show.title.english || show.title.romaji}</div>
            <div className="opacity-50">{show.genres.join(", ") || "Comedy"}</div>
          </div>
        </div>
      </div>
      <div className="relative mx-auto hidden h-[70vh] w-full md:flex">
        <Image
          alt={show.title.userPreferred}
          src={show.cover}
          width={500}
          height={500}
          className="h-full w-full rounded-t-xl object-cover object-center"
        />
        <div className="to-from-background/10 absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-background">
          <div></div>
          <div className="mx-auto w-[96%]">
            <div className="flex w-[500px] flex-col gap-1 text-pretty uppercase">
              <div className="text-sm normal-case opacity-50">{show.releaseDate}</div>
              <div className="text-pretty text-3xl font-bold">
                {show.title.english || show.title.romaji}
              </div>
              <div className="line-clamp-3 text-xs normal-case opacity-50">{show.description}</div>
              <div className="my-2 flex gap-2">
                <Link href={`/anime/${show.id}`}>
                  <Button variant={"default"} className="w-full whitespace-nowrap">
                    Go To Show
                  </Button>
                </Link>
                {show.genres.map((genre, index) => (
                  <Badge key={index} variant="outline" className="my-4 ml-4 whitespace-nowrap">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselCard