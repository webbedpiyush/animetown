"use client"
import { IAnimeResult } from "@consumet/extensions/dist/models";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Loading from "./loading";

type AnimeFeatureType = "recent" | "popular" | "trending";

type AnimeFeatureProps = {
  featureType: AnimeFeatureType;
};

export default function FeaturedAnime({ featureType }: AnimeFeatureProps) {
  const [data, setData] = useState<IAnimeResult[] | null>(null);
  const [loading, setLoading] = useState(true);

  const anilist = useMemo(() => new Anilist(new Gogoanime()), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let res;
      switch (featureType) {
        case "recent":
          res = await anilist.fetchRecentEpisodes(1,20);
          break;
        case "popular":
          res = await anilist.fetchPopularAnime(1, 20);
          break;
        case "trending":
          res = await anilist.fetchTrendingAnime(1, 20);
          break;
      }

      setData(res.results);
      setLoading(false);
    };

    fetchData();
  }, [anilist, featureType]);

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
                  {item.image ? (
                    <Image
                      fill
                      className="object-cover"
                      src={item.image}
                      alt={
                        typeof item.title === "string"
                          ? item.title
                          : item.title.english ||
                            item.title.userPreferred ||
                            item.title.romaji ||
                            item.title.native ||
                            ""
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
                        {typeof item.title === "string"
                          ? item.title
                          : item.title.english ||
                            item.title.userPreferred ||
                            item.title.romaji ||
                            item.title.native ||
                            ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {item.rating && (
                        <Badge variant="outline">
                          {item.rating ? item.rating / 10 : "?"}
                        </Badge>
                      )}
                      <Separator orientation="vertical" className="h-6" />
                      <Badge variant="secondary">
                        {item.episodeNumber
                          ? item.episodeNumber
                          : item.totalEpisodes ?? "?"}
                      </Badge>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-xs text-muted-foreground">
                    {/* Recent only includes ep. title and others only have description */}
                    {item.episodeTitle}
                    {item.description}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
