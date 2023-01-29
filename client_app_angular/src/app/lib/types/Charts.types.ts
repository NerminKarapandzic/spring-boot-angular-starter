export type ChartData = {
  seriesData: SeriesData[];
}

export type SeriesData = {
  name: string;
  series: Series[];
}

export type Series = {
  name: string;
  value: number;
}
