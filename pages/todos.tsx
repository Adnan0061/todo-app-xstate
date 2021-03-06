import { useMachine } from "@xstate/react";
import { todoMachine } from "../machines/todoMachine";

const todos = new Set<string>(["take bins out", "do laundry"]);

function Todos() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error("oh no!!!!!!!!!!!!");
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.createNewTodoFormInput);
      },
      deleteTodo: async (context, event) => {
        // throw new Error("oh no!!!!!");
        todos.delete(event.todo);
      },
    },
  });

  return (
    <div style={{ width: "100vw", overflow: "hidden", padding: "10px" }}>
      <h1>Test 1</h1>
      <p>{JSON.stringify(state.value)}</p>
      {/* <p>{JSON.stringify(state.context)}</p> */}

      {state.matches("Deleting todo") && (
        <ul>
          {state.context.todos.map((item, index) => (
            <div key={index} style={{ display: "flex", margin: "5px" }}>
              <li style={{ display: "block", margin: "0 10px 0 0" }}>
                {index + 1}. {item}
              </li>
              <button onClick={() => send({ type: "Delete", todo: item })}>Delete todo</button>
            </div>
          ))}
        </ul>
      )}

      {!state.matches("Deleting todo") && (
        <ul>
          {state.context.todos.map((item, index) => (
            <div key={index} style={{ display: "flex", margin: "5px" }}>
              <li style={{ display: "block" }}>
                {index + 1}. {item}
              </li>
            </div>
          ))}
        </ul>
      )}

      <div>
        {state.matches("Creating new todo.Showing form input") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send({
                type: "Submit",
              });
            }}
            action=""
          >
            <input
              type="text"
              onChange={(e) =>
                send({
                  type: "Form input changed",
                  value: e.target.value,
                })
              }
            />
            <button type="submit">submit</button>
          </form>
        )}

        {state.matches("Todos Loaded") && (
          <>
            <button
              onClick={() =>
                send({
                  type: "Create new",
                })
              }
            >
              Create new todo
            </button>
            <button
              onClick={() =>
                send({
                  type: "Delete one",
                })
              }
            >
              Delete a todo
            </button>
          </>
        )}

        {state.matches("Deleting todo") && (
          <button
            onClick={() =>
              send({
                type: "Go to home",
              })
            }
          >
            Go to home
          </button>
        )}

        {state.matches("Creating new todo") && (
          <button
            onClick={() =>
              send({
                type: "Go to home",
              })
            }
          >
            Go to home
          </button>
        )}
      </div>
    </div>
  );
}

export default Todos;
