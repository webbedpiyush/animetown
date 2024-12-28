"use client";
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
  const [anime, setAnime] = useState<any[] | null>(null);

  let data: {
    [x: string]: any; topAiringAnimes: React.SetStateAction<any[] | null> 
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/HomePage`, {
          method: "GET",
        });
        data = await response.json();
        console.log(data);
        setAnime(data.data.spotlightAnimes);
        console.log(data.data.spotlightAnime)
        const [movie, tvs] = await Promise.all([
          tmdb.movies.popular("en-US"),
          tmdb.tv.popular("en-US"),
        ]);
        setTvData(tvs);
        // console.log(movie);
        setMovieData(movie);
        setError(null);
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

        { anime && movieData && tvData && (
          <>
            <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
              {movieData?.results.slice(0, 10).map((movie) => (
                <Card key={movie.id} item={movie} />
              ))}
            </Marquee>
            <Marquee pauseOnHover className="max-w-screen [--duration:40s]">
              {anime && 
                anime
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

export function AnimeCard({ anime }: any) {
  console.log(anime);
  return (
    <Link
      href={`/anime/${anime?.id}`}
      className="group relative flex max-w-xs cursor-pointer flex-col gap-2 overflow-hidden md:max-w-sm"
    >
      <div className="relative aspect-video flex w-full animes-center justify-center overflow-hidden rounded-md border bg-background/50 shadow">
        {anime?.poster ? (
          <Image
            fill
            className="rounded-xl object-cover"
            src={anime.poster}
            alt={anime.name}
            sizes="100%"
          />
        ) : (
          <ImageIcon className="text-muted" />
        )}
      </div>
      <div className="space-y-1.5">
        <div className="flex animes-start justify-between gap-1">
          <span className="text-sm font-semibold">{anime?.name}</span>
          <Badge variant="outline" className="">
            {anime?.type}
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
