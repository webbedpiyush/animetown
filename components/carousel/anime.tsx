import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CarouselCard from "./card";

export default async function AnimeCarousel() {
  const anilist = new Anilist(new Gogoanime());
  const data = await anilist.fetchPopularAnime(1, 20);

  if (!data) {
    return <div>None Found</div>;
  }

  return (
    <>
      <Carousel className="mb-10">
        <CarouselContent className="mx-auto flex w-full">
          {data.results?.map((el: any) => (
            <CarouselItem key={el.id}>
              <CarouselCard show={el} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
