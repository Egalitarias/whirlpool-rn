export type RoundModel = {
  words: string[];
  heartWord: number;
};

export type WordPosition = {
  angle: number;
  arc: number;
  wordCircleDiameter: number;
};

export type PipeGameModel = RoundModel[];

export type WhirlpoolState = {
  state: string;
  roundIndex: number;
  heartWord: string;
  wordPressed: string;
  heartWordPressed: boolean;
  pass: boolean;
  complete: boolean;
};
