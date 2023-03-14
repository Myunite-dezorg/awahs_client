export interface Airline {
  id: string;
  iata: string;
  icao: string;
  country: string;
  commentEng: string;
  commentRus: string;
  rusCode: string;
  description: string;
  arlLogo: string;
}

export interface AirlinesQueryResult {
  airlines: Airline[];
}
