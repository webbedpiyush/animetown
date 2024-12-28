"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image"
import { useCallback, useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/specialPlaceholder";
import { getSearchedManga, PreFetchMangaInfo } from "@/lib/consumet";

export default function Page() {
  const placeholders = [
    "Naruto (2002-2007)",
    "Attack on Titan (2013-2023)",
    "Death Note (2006-2007)",
    "Demon Slayer: Kimetsu no Yaiba (2019-present)",
    "My Hero Academia (2016-present)",
    "Fullmetal Alchemist: Brotherhood (2009-2010)",
    "Attack on Titan: The Final Season (2020-2023)",
    "Jujutsu Kaisen (2020-present)",
    "Sword Art Online (2012-2017)",
    "Black Clover (2017-present)",
    "One Piece (1999-present)",
    "Haikyuu!! (2014-2020)",
    "Blue Exorcist (2011-2016)",
    "Sword Art Online: Alicization (2018-2019)",
    "The Rising of the Shield Hero (2019-present)",
  ];
  const [title, setTitle] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loadingText, setLoadingText] = useState(false);

  const handleSearch = async (title: string) => {
    if (title) {
      setLoadingText(true);
      const data = await getSearchedManga(title);
      PreFetchMangaInfo(data);
      setLoadingText(false);
      setData(data.results);
    }
  };

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (this: void, ...args: any[]) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    handleSearch,
  ]);

  useEffect(() => {
    if (title) {
      debouncedSearch(title);
    }
  }, [debouncedSearch, title]);

  return (
    <>
      <div className="flex h-[30rem] flex-col items-center justify-center px-4">
        <h2>Search for Mangas... 📖</h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(event : any) => setTitle(event.target.value)}
          onSubmit={() => handleSearch(title)}
        />
      </div>
      <div className="container flex flex-col items-center gap-6 pb-8">
        {loadingText && (
          <div className="flex w-full items-center justify-center gap-x-2">
            <div className="h-5 w-5 animate-pulse rounded-full bg-[#d991c2]"></div>
            <div className="h-5 w-5 animate-pulse rounded-full bg-[#9869b8]"></div>
            <div className="h-5 w-5 animate-pulse rounded-full bg-[#6756cc]"></div>
          </div>
        )}
        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6">
          {data &&
            data.map((item: any, index: any) => {
              return (
                <Link
                  shallow
                  href={`/manga/${item.id}`}
                  style={{ textDecoration: 'none' }}
                  key={index}
                >
                  <Card className="pt-4">
                    <CardContent>
                      <Image
                        className="aspect-[3/4] h-2/4 w-full rounded-xl object-cover transition-all"
                        src={item.image}
                        width={160}
                        height={160}
                        alt="Manga Poster"
                      />
                    </CardContent>
                  </Card>

                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-1 px-2 pt-1">
                      <span className="trucate line-clamp-1 pt-1">
                        {item.title['english'] || item.title['romaji']}
                      </span>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline">{item.rating / 10}</Badge>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>{item.status}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <p className="line-clamp-3 px-2 pt-1 text-xs text-muted-foreground">
                      Volumes:{' '}
                      {item.volumes !== undefined && item.volumes !== null ? item.volumes : '?'}{' '}
                      {''}
                      Chapters:{' '}
                      {item.totalChapters !== undefined && item.totalChapters !== null
                        ? item.totalChapters
                        : '?'}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
}