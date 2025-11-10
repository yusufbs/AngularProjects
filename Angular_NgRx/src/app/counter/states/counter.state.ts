export interface CounterState {
  counter: number;
  toggle: boolean;
}

export const initialCounterState: CounterState = {
  counter: 0,
  toggle: false,
};
