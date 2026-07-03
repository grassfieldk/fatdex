export type WeightProfile = {
  name: string;
  ticker: string;
  exchange: string;
  sector: string;
  age: number;
  height: number;
  targetWeight: number;
  startWeight: number;
  startDate: string;
  description: string;
};

/** 1日分の体重を株価の OHLC として表現する */
export type WeightCandle = {
  /** YYYY-MM-DD */
  time: string;
  /** 朝の体重（始値） */
  open: number;
  /** 食後最高値（高値） */
  high: number;
  /** 運動後最低値（安値） */
  low: number;
  /** 夜の体重（終値） */
  close: number;
};

export type WeightData = {
  profile: WeightProfile;
  data: WeightCandle[];
};
