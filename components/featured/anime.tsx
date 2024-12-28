"use client";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,  useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Loading from "./loading";

type AnimeFeatureType = "recent" | "popular" | "trending";

type AnimeFeatureProps = {
  featureType: AnimeFeatureType;
};

export default function FeaturedAnime({ featureType }: AnimeFeatureProps) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`/api/HomePage`, {
        method: "GET",
      });
      const respons = await response.json();
      console.log(respons);

      let res;
      switch (featureType) {
        case "recent":
         
          res = respons.data.latestEpisodeAnimes
          break;
        case "popular":
       
          res = respons.data.topAiringAnimes
          break;
        case "trending":
         
          res = respons.data.trendingAnimes
          break;
      }

      
      setData(res);
      setLoading(false);
    };

    fetchData();
  }, [featureType]);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
          {loading ? (
            <Loading />
          ) : (
            data &&
            data.map((item, index) => (
              <Link
                href={`/anime/${encodeURIComponent(item.id)}`}
                key={index}
                className="w-full cursor-pointer space-y-2"
                data-testid="movie-card"
              >
                <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
                  {item.poster ? (
                    <Image
                      fill
                      className="object-cover"
                      src={item.poster}
                      alt={
                        item.name
                      }
                      sizes="100%"
                    />
                  ) : (
                    <ImageIcon className="text-muted" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <div className="justify-start">
                      <span className="trucate line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {item.rank && (
                        <Badge variant="outline">
                          {item.rank}
                        </Badge>
                      )}
                      <Separator orientation="vertical" className="h-6" />
                      <Badge variant="secondary">
                        {item?.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
