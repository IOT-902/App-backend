export interface ISensorLocalisation {
  latitude: number;
  longitude: number;
  time: Date;
}

export interface ISensorValue {
  value: number;
  time: Date;
}

export interface ISensorHistoryInfo {
  mac_adress: string
  localisations: ISensorLocalisation[];
  temperatures: ISensorValue[];
  pollutionAs: ISensorValue[];
  pollutionBs: ISensorValue[];
}