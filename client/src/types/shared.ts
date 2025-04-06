export interface AlgorithmState {
  d: number[];
  prev: number[];
  currentI: number;
  currentJ: number;
  lis: number[];
}

export interface Example {
  id: number;
  name: string;
  sequence: number[];
  selected: boolean;
}
