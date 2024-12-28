import DetailsContainer from "@/components/containers/anime/details";
import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import Anilist from "@consumet/extensions/dist/providers/meta/anilist";

export default async function Page({ params }: any) {
  const id = await params.id;

  const response = await fetch(`http://localhost:3000/api/AboutAnime`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
  });
  const res = await response.json();
  console.log(res.data.anime.info);
  const anilist = new Anilist(new Gogoanime());
  const result = await anilist.fetchAnilistInfoById(
    res.data.anime.info.anilistId
  );
  console.log(result)

  return <DetailsContainer data={result} anime={res}/>;
  // return <pre>res</pre>;
}
