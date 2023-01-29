export type Status = {
  components: {
    db: {
      status: string,
      details: {
        database: string
      },
    },
    diskSpace: {
      status: string,
      details: {
        total: number,
        free: number,
      }
    }
  }
  status: string;
}

export type Info = {
  uptime: number;
}

export type HttpRequestStatistics = {
  availableTags: AvailableTags[];
  baseUnit: string;
  measurements: Measurement[];
}

export type Measurement = {
  statistic: string;
  value: number;
}

export type AvailableTags = {
  tag: string;
  values: string[];
}
