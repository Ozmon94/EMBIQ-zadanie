export type DriverType = {
  id: number;
  name: string;
  image: string;
  nationality: string;
  birthdate: string;
  birthplace: string;
  number: number;
  grands_prix_entered: number;
  world_championships: number;
  podiums: number;
  career_points: string;
  country: { name: string };
  teams: { team: { name: string } }[];
};
