export interface Resource {
  villages: number;
  population: number;
  tick: number;
  tickTime: Date;
  filar: number;
  souls: number;
  blood: number;
  actionPoints: number;
}

export interface GameEvent {
  icon: string;
  visible: boolean;
}
