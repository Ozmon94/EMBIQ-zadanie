export type RaceType = {
  position: number;
  driver: {
    id: number;
    name: string;
    abbr: string;
  };
  team: {
    name: string;
  };
};
