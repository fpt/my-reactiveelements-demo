import * as React from 'react';
import {withState, withHandlers, compose, pure} from 'recompose';
import * as styles from './mycounter.css';


interface CounterState {
  counter: number;
  setCounter: (fn: (n: number) => number) => void;
};

interface HandlerProps {
  increment: (event: React.MouseEvent<HTMLButtonElement>) => void;
  decrement: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const MyInnerCounter: React.StatelessComponent<CounterState & HandlerProps>
  = ({ counter, setCounter, increment, decrement, children }) => (
    <div>
      <input className={styles.counter} readOnly={true} value={counter}/>
      <button className={styles.updown} onClick={increment}>Up</button>
      <button className={styles.updown} onClick={decrement}>Down</button>
    </div>
  );

const enhance = compose<CounterState, HandlerProps>(
  withState<CounterState, number, string, string>('counter', 'setCounter', 0),
  withHandlers<CounterState, HandlerProps>({
    increment: ({ setCounter }) => () => setCounter((n: number) => n + 1),
    decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
  }),
  pure
);

const MyCounter = enhance(MyInnerCounter);

export default MyCounter;