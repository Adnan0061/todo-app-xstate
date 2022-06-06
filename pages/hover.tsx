import { useMachine } from "@xstate/react";
import { myMachine } from "../machines/myFirstMechine";

const Hover = () => {
  const [state, send] = useMachine(myMachine);

  return (
    <div className="">
      <h1>Test 1</h1>
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send("mouseOver")}>make hovered</button>
      <button onClick={() => send("mouseOut")}>make not hovered</button>
      <button onClick={() => send("overNOut")}>toggle</button>
    </div>
  );
};

export default Hover;
