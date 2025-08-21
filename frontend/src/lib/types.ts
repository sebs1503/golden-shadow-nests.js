export interface Family {
  _id: string;
  name: string;
  description?: string;
  city?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MurderMethod {
  _id: string;
  name: string;
  description?: string;
  symbolism?: string;
  displayPattern?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Victim {
  _id: string;
  firstName: string;
  lastName: string;
  age?: number;
  occupation?: string;
  family: string | Family;
  mannerOfDeath?: string | MurderMethod;
  case?: string | CaseFile;
  bodyDiscoveryDetails?: string;
  dateOfDeath?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum CaseStatus {
  OPEN = 'OPEN',
  INVESTIGATING = 'INVESTIGATING',
  CLOSED = 'CLOSED',
}

export interface CaseFile {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  status: CaseStatus;
  families: (string | Family)[];
  murderMethod?: string | MurderMethod;
  victims: (string | Victim)[];
  clues: string[];
  investigatorName?: string;
  mediaLinks: string[];
  createdAt?: string;
  updatedAt?: string;
}
