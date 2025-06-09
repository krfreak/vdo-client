export interface Group {
  id: number;
  name: string;
  diplomacy: GroupDiplomacy[];
}

export interface GroupDiplomacy {
  id: number;
  ours: DiplomacyStance;
  theirs: DiplomacyStance;
}

export enum DiplomacyStance {
  neutral,
  war,
  peace,
}
