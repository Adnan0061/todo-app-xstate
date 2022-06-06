import { useMachine } from "@xstate/react";
import { todoMachine } from "../machines/todoMachine";

function Todos() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error("oh no!!!!!!!!!!!!");
        return ["take bins out", "do laundry"];
      },
    },
  });

  return (
    <div className="">
      <h1>Test 1</h1>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
}

export default Todos;
