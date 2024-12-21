import { MediaType } from "../utils/with-media-type";
import { MovieWithMediaType } from "./movie";
import { TvSerieWithMediaType } from "./tv-series";

export type RawMovieCredit = MovieWithMediaType & {
  character: string;
};

export type RawTvSerieCredit = TvSerieWithMediaType & {
  character: string;
};

export type RawCombinedCredit = RawMovieCredit | RawTvSerieCredit;

export type CombinedCreditsResponse = {
  cast: Array<RawCombinedCredit>;
  crew: Array<RawCombinedCredit>;
};

export type CombinedCredit = {
  id: number;
  title: string;
  date: string;
  media_type: MediaType;
  role: string;
  vote_average: number;
  vote_count: number;
  backdrop_path?: string;
};

export type CombinedCredits = {
  cast: Array<CombinedCredit>;
  crew: Array<CombinedCredit>;
};