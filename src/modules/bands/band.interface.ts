export interface Band {
  _id: string;
  name: string;
  origin: string;
  membersId: Member[];
  website: string;
  genresIds: string[];
}

export interface Member {
  id: string;
  firstName: string;
  secondName: string;
  instrument: string;
  years: string[];
}