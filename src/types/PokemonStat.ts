export interface Stat {
  name: string;
  url: string;
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}
