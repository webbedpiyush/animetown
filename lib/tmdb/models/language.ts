export type Language =
  | "en-US"
  | "es-ES"
  | "fr-FR"
  | "de-DE"
  | "it-IT"
  | "pt-BR"
  | "ja-JP";

export type GetLanguagesResponse = Array<{
  englishName: string;
  iso_639_1: string;
  name: string;
}>;
