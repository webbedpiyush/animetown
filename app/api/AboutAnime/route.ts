import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function POST(req: Request, res: Response) {
  const { id } = await req.json();
  console.log(id);
  try {
    const data = await hianime.getInfo(id);
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}
