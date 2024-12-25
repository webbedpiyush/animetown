export async function getAnimeEpisodeLink(
  animeName: string,
  episodeNumber: number
) {
  try {
    console.log("starting");
    // Search for the anime
    const searchResp = await fetch(
      `${process.env.BASE_URL}api/v2/hianime/search?q=${encodeURIComponent(
        animeName
      )}`
    );
    const searchData = await searchResp.json();
    console.log("search data", searchData);

    if (!searchData.success || !searchData.data.animes.length) {
      throw new Error("Anime not found");
    }

    // Improved anime matching logic
    const anime = searchData.data.animes.find((a: any) => {
      // Normalize strings by converting to lowercase, removing extra spaces
      if (a.name.toLowerCase() === animeName.toLowerCase()) {
        return a;
      }
      const normalizedSearchName = animeName.toLowerCase().trim();
      const normalizedAnimeName = a.name.toLowerCase().trim();

      // Helper function to clean title for comparison
      const cleanTitle = (title: string) => {
        return title
          .toLowerCase()
          .replace(/season\s*\d+/g, "") // Remove "season X"
          .replace(/\s*:\s*/g, ":") // Normalize colons
          .replace(/\s+/g, " ") // Normalize spaces
          .trim();
      };

      const cleanedSearchName = cleanTitle(normalizedSearchName);
      const cleanedAnimeName = cleanTitle(normalizedAnimeName);

      // Check for exact match first
      if (cleanedSearchName === cleanedAnimeName) {
        return true;
      }

      // Check if search query without season info matches
      const searchWithoutSeason = cleanedSearchName.split("season")[0].trim();
      const animeWithoutSeason = cleanedAnimeName.split("season")[0].trim();

      if (searchWithoutSeason === animeWithoutSeason) {
        return true;
      }

      // For BOFURI specific case and similar titles with colons
      const searchMainTitle = cleanedSearchName.split(":")[0].trim();
      const animeMainTitle = cleanedAnimeName.split(":")[0].trim();

      if (searchMainTitle === animeMainTitle) {
        return true;
      }

      return false;
    });

    if (!anime) {
      throw new Error("Anime not found");
    }
    console.log("anime data", anime);

    // Get episodes for the anime
    const episodesResp = await fetch(
      `${process.env.BASE_URL}api/v2/hianime/anime/${anime.id}/episodes`
    );
    const episodesData = await episodesResp.json();

    if (!episodesData.success || !episodesData.data.episodes.length) {
      throw new Error("Episodes not found");
    }

    console.log("episode data", episodesData);

    const episode = episodesData.data.episodes.find(
      (ep: any) => Number(ep.number) === episodeNumber
    );

    if (!episode) {
      throw new Error(`Episode ${episodeNumber} not found`);
    }

    console.log("episode ", episode);
    const serversResp = await fetch(
      `${process.env.BASE_URL}api/v2/hianime/episode/servers?animeEpisodeId=${episode.episodeId}`
    );
    const serversData = await serversResp.json();
    console.log(serversData.data);

    console.log("servers data", serversData);
    // Get streaming sources for the episode
    const sourcesResp = await fetch(
      `${process.env.BASE_URL}api/v2/hianime/episode/sources?animeEpisodeId=${episode.episodeId}&server=${serversData.data.sub[0].serverName}&category=sub`
    );
    const sourcesData = await sourcesResp.json();

    if (
      !sourcesData.success ||
      !sourcesData.data.sources ||
      !sourcesData.data.sources.length
    ) {
      throw new Error("No sources available");
    }
    console.log("sources data", sourcesData);

    console.log(
      sourcesData.data.sources[0].url,
      sourcesData.data.tracks[0].file
    );
    return sourcesData.data;
  } catch (error: any) {
    console.error("Error getting anime episode link:", error.message);
    throw error;
  }
}
