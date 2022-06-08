import { actions, assign, createMachine } from "xstate";
import Todos from "../pages/todos";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiAIxaAnBQBMANgAc9144DMzu3YAsLgA0IACeiAC0-vYUAKxesQDsiY6JWsmx-s5eAL45IUI4BCScEvSkjEJsYABONag1FAYANioAZg0AthSFIiXitOWVMnIKSqaauuZGsCZqpOZWCBGxrokUds5a21qO9taOayHhyy7Occ6Jrq5e1gn+yWt5BTJFopxVmGWQrADCNWAVGBMOQAO7TYwTRaILyuawUfyeRyxLRrQ6OaxJY6RWyxCjOfzRNaxWLWLJXOzPEC9YpiHojL6DH4AETAzTAymB6jAENmUKQlkQSX8cWiBLuWlh-lJ2OWgS8+K89i8AVczgx1ipNPeA0kFWkLEwAFE6g0fhZYMogRRcG1OTUABR7bYASlY2v61EGUk+JvqAIgvLmZgFSyi6oRSq01jSSrc6VlETJjgoKV2rn8dm8t2cWtefTp-0Bqn1YMwyhkFAAyoRUKCpB0ap1MGQDABXZSsABiXRbpHbykwRFwFUgQf5oCWyVTMYC-hVXnnaq8ssX8LcKpRPlRqrzGDenqLKikZYrGGrtfr+sbzdbHdYVbbACNOiZx-NoQhF1onK47ErrACAkfAeWVrGceE7C0dVJUOG5PHSPdhFpTgjxLRhT0rKtcG4KQz1QdhuS4UheAEel9wLVCAWPUswFBcssJwvCZHkEjFGPdRtD0AUZmDBZQyFTEKFscDYQxZEyVcRNF1TZJkWiKD5wXWIkIPQtqPQkE6IY89sNw-V8NYWp-SaVplBvcjkJ1Cg0JPbT8OrJiDJYsYOMmbjDEhD8BK-RE4nSZFrhudJEhXMIYX8dcbjsLctj-RFVMoyhbNo+jDIAcSwCtMFrToeR4ryQ0nSJDjxPxMz8WI7DVVJJUTTIKFRexoMA5JLiSFT8mpfMUMoVl2U0hyazrZj92aYhLVYfqOXyzy+W84qEESITEWlNIUUcQJ4kTOERUROTokyDNEk6l4KN6ihpsGysruBQyOEoBQyI9OkrtG1BLrZGadNQVjeHGeYuPfIrBQQXwnFReJVS0QIIMSRMCQcVISWqmMvHR-9Eout7nPPW6fqM01GhadoukstTOBxxgHPx-C-vYiYgYK+aQaWdqEUlLxHE2vwthOxN5UVZVVXVaxNS6l7Ka+66MFYTKGJy1A8uB-jFoiUqNgCaqYd8LZwMTRJ50VcD1qyE3XCx6yqZ+zBjLNCBWAtK1ORtO1aidHY3Ulvrpfe22ibHZm+M-NxXGEolANiNx4lCxNAJFQ5F2JarnFJcWutIdA4HMb2vT1YYWBVz8Ii5vFkUN64CSyLNE1SBxoKuVwo6C7nKQlnrrM+b5AyDidQcyBUIKj24MmFeHwuWJU8TuWwCRuA5EgCS3PTKH0GT9e2i58iIIIVbY-DsE7SXRv8EZ-VYdybgfDci-xl-U4s7LSrDLwbXs72ULfFsXjZDesGrMyZAeOPE4mI8Rij2AkKOiIT73yoo-VKP1HL6WpjIL+oNAGphRB4bwEom5gUcA4KCEEoI+AzNAuByUNJPx+ugpY8QZyL0JAuJc2RZRRw2C1TYJI4RKmuJQz6A13oXhGrjLA41LR0MQNEFMaQ7D-2HtGTEIDIgIQ2GsUKm0kj-2RAI62NNpZ3TQb3BaoNU4ikyOtewwpURhRODvOETgj5a1Cv-GGejfZiKkV+K4qZ9hN2yEorEE8Ih-gVNVZII9Yy7nbudK2njUH7jtgGbxVx1hHXRm4bISRfBxwOOHaIi8oLuENqFSh3id5eHWPvPwR87iwjsImTY5wImuNsXzRweQ8hAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./todoMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
        events: {} as
          | { type: "Create new" }
          | { type: "Delete one" }
          | { type: "Delete"; todo: string }
          | { type: "Form input changed"; value: string }
          | { type: "Submit" }
          | { type: "Clear input form" }
          | { type: "Go to home" },
      },
      id: "Todo Machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                actions: "assignTodosToContext",
                cond: "Has todos",
                target: "Todos Loaded",
              },
              {
                actions: "assignTodosToContext",
                target: "Creating new todo",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Loading Todos Errored",
              },
            ],
          },
        },
        "Todos Loaded": {
          on: {
            "Create new": {
              target: "Creating new todo",
            },
            "Delete one": {
              target: "Deleting todo",
            },
          },
        },
        "Loading Todos Errored": {
          after: {
            "2000": {
              target: "Loading Todos",
            },
          },
        },
        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
                Submit: {
                  target: "Saving todo",
                },
              },
            },
            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    actions: "clearInputForm",
                    target: "#Todo Machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Showing form input",
                  },
                ],
              },
            },
          },
          on: {
            "Go to home": {
              target: "Loading Todos",
            },
          },
        },
        "Deleting todo": {
          initial: "Showing todo list",
          states: {
            "Showing todo list": {
              on: {
                Delete: {
                  target: "Delete todo",
                },
              },
            },
            "Delete todo": {
              invoke: {
                src: "deleteTodo",
                onDone: [
                  {
                    target: "#Todo Machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    target: "#Todo Machine.Deleting todo errored",
                  },
                ],
              },
            },
          },
          on: {
            "Go to home": {
              target: "Loading Todos",
            },
          },
        },
        "Deleting todo errored": {
          after: {
            "2000": {
              target: "Todos Loaded",
            },
          },
        },
      },
    },
    {
      guards: {
        "Has todos": (context, event) => {
          return event.data.length > 0;
        },
      },
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
        clearInputForm: assign((context, event) => {
          return {
            createNewTodoFormInput: "",
          };
        }),
      },
    }
  );
