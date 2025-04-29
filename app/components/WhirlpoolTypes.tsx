export type RoundModel = {
  words: string[], 
  heartWord: number
};

export type WordPosition = {
  angle: number;
  arc: number;
  wordCircleDiameter: number;
};

export type PipeGameModel = RoundModel[];

export type WhirlpoolState = {
  wordPressed: string | null;
};
