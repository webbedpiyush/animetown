import { HiAnime } from "aniwatch";

const hianime = new HiAnime.Scraper();

export async function GET(req: Request, res: Response) {
  try {
    const data = await hianime.getHomePage();
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
