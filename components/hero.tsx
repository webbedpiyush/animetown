"use client";
import { IAnimeResult } from "@consumet/extensions/dist/models/types";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { Movie, tmdb, TvSerie } from "@/lib/tmdb";
import { ListResponse } from "@/lib/tmdb/utils/list-response";
import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "./ui/spinner";
import Marquee from "./ui/marquee";
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";

export default function Hero() {
  const [movieData, setMovieData] = useState<ListResponse<Movie> | null>(null);
  const [tvData, setTvData] = useState<ListResponse<TvSerie> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [anime, setAnime] = useState<IAnimeResult[] | null>(null);

  const anilist = useMemo(() => new Anilist(new Gogoanime()), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movie, tvs] = await Promise.all([
          tmdb.movies.popular("en-US"),
          tmdb.tv.popular("en-US"),
        ]);
        setTvData(tvs);
        console.log(movie);
        setMovieData(movie);
        setError(null);

        const res = await anilist.fetchTrendingAnime(1, 20);
        console.log(res.results);
        setAnime(res.results);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="py-14 text-center text-red-500">
        <p>Failed to load data: {error}</p>
      </div>
    );
  }
  return (
    <section id="showcase" className="container py-14">
      <div className="relative flex flex-col">
        {loading && (
          <div className="flex items-center justify-center py-14">
            <Spinner size={"large"} />
          </div>
        )}

        {anime && movieData && tvData && (
          <>
            <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
              {movieData?.results.slice(0, 10).map((movie) => (
                <Card key={movie.id} item={movie} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
              {anime &&
                anime
                  ?.slice(0, 20)
                  .map((anime) => (
                    <AnimeCard
                      key={anime.id}
                      anime={anime}
                      id={anime.id}
                      title={anime.title}
                    />
                  ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="max-w-screen mt-10 [--duration:80s]"
            >
              {tvData?.results.slice(0, 10).map((tv) => (
                <Card key={tv.id} item={tv} />
              ))}
            </Marquee>
          </>
        )}
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}

export interface CardProps {
  item: Movie | TvSerie;
}

export function Card({ item }: CardProps) {
  const title = "title" in item ? item.title : item.name;
  const backdropPath = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;

  return (
    <Link
      href={`/movie/${item.id}`}
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="relative aspect-video flex w-full items-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
        {backdropPath ? (
          <Image
            fill
            className="rounded-xl object-cover"
            src={backdropPath}
            alt={title}
            sizes="100%"
          />
        ) : (
          <ImageIcon className="text-muted" />
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-1">
          <span className="text-sm font-semibold">{title}</span>
          <Badge variant="outline">
            {item.vote_average ? item.vote_average.toFixed(1) : "?"}
          </Badge>
        </div>
        <p className="line-clamp-3 text-xs text-muted-foreground">
          {item.overview || (
            <>
              No description is available for this item at the moment. Please
              check back later or search up somewhere else
            </>
          )}
        </p>
      </div>
    </Link>
  );
}

export function AnimeCard({ anime }: IAnimeResult) {
  return (
    <Link
      href={`/anime/${anime?.id}`}
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="relative aspect-video flex w-full animes-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
        {anime?.image ? (
          <Image
            fill
            className="rounded-xl object-cover"
            src={anime.image}
            alt={anime.title?.english}
            sizes="100%"
          />
        ) : (
          <ImageIcon className="text-muted" />
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex animes-start justify-between gap-1">
          <span className="text-sm font-semibold">{anime?.title?.english}</span>
          <Badge variant="outline">
            {anime?.rating / 10 ? (anime?.rating.toFixed(1))/10 : "?"}
          </Badge>
        </div>
        <p className="line-clamp-3 text-xs text-muted-foreground">
          {anime?.description || (
            <>
              No description is available for this anime at the moment. Please
              check back later or search up somewhere else
            </>
          )}
        </p>
      </div>
    </Link>
  );
}
