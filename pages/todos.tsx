import { useMachine } from "@xstate/react";
import { todoMachine } from "../machines/todoMachine";

function Todos() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        throw new Error("oh no");
        return ["take bins out", "do laundry"];
      },
    },
  });

  return (
    <div className="">
      <h1>Test 1</h1>
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send({ type: "todos loaded", todos: ["take bins out"] })}>Load todo</button>
      <button onClick={() => send({ type: "loading todo failed", errorMessage: "oh no!!!!!!!" })}>Loading todo failed</button>
    </div>
  );
}

export default Todos;
