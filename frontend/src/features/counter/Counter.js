// counter component, connect react to redux
import { useSelector, useDispatch } from 'react-redux';

// import actions
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  incrementAsync,
} from './counterSlice';

import { useState } from 'react';

function Counter() {
  // add our state to the component
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  // amount that we choose to incrementByAmount
  const [incrementAmount, setIncrementAmount] = useState(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        {/* dispatch : calling an action */}
        <button onClick={() => dispatch(incrementAsync(15))}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  );
}
export default Counter;
