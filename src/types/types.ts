export type City = {
  lat: number;
  lng: number;
  zoom?: number;
};

export type Point = {
  lat: number;
  lng: number;
  title: string;
};

export type Points = Point[];
