"use client";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";
import { Download } from "lucide-react";
import Link from "next/link";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useEffect, useState } from "react";
import { getAnimeEpisodeLink } from "@/lib/animeLinks";
import { useParams } from "next/navigation";
import { Track, type TrackProps } from "@vidstack/react";

export default function Page() {
  const param = useParams<{ id: string; episode: string; number: string }>();
  const anilist = new Anilist(new Gogoanime());
  const [link, setLink] = useState("");
  const [caption, setCaption] = useState("");

  function removeQueryParams(url: string, paramsToRemove: string[]): string {
    const urlObj = new URL(url);
    paramsToRemove.forEach((param) => urlObj.searchParams.delete(param));
    return urlObj.toString();
  }

  useEffect(() => {
    async function fetch() {
      const data = await anilist.fetchAnilistInfoById(param.id);
      console.log(data.title.english);
      const data2 = await getAnimeEpisodeLink(
        data.title.english,
        Number(param.number)
      );
      const caption = data2.tracks.filter((anime) => anime.label === "English");
      console.log(caption)
      setCaption(caption.file);
      setLink(data2.sources[0].url);
    }
    fetch();
  }, [setLink]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-1 pt-10">
      <div className="pb-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col flex-wrap pb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/anime/${param.id}`}>
                    {param.id.charAt(0).toUpperCase() + param.id.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{param.episode}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col text-center">
          <div className="pb-2">
            <Link href={``}>
              <Badge
                variant={"outline"}
                className="cursor-pointer whitespace-nowrap"
              >
                <Download className="mr-1.5" size={12} />
                Download Episode
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      {link && (
        <div className="mx-auto flex max-w-4xl">
          <MediaPlayer src={`${link}`}>
            <MediaProvider />
            <Track kind="subtitles" src={caption} label="English" default />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      )}
    </div>
  );
}
