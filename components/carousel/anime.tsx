import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CarouselCard from "./card";

export default async function AnimeCarousel() {
  const response = await fetch(`http://localhost:3000/api/HomePage`, {
    method: "GET",
  });
  const data = await response.json();
  const results = data.data.top10Animes.today;
  console.log(results);
  

  if (!data) {
    return <div>None Found</div>;
  }

  return (
    <>
      <Carousel className="mb-10">
        <CarouselContent className="mx-auto flex w-full">
          {results.map((el: any) => (
            <CarouselItem key={el.id}>
              <CarouselCard  anime={el}/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
