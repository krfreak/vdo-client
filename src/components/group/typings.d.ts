export interface Nation {
  id: number;
  name: string;
  diplomacy: NationDiplomacy[];
}

export interface NationDiplomacy {
  id: number;
  ours: DiplomacyStance;
  theirs: DiplomacyStance;
}

export enum DiplomacyStance {
  neutral,
  war,
  peace,
}
