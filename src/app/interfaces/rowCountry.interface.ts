export interface RawCountry {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  borders?: string[];
}
