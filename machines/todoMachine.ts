import { actions, assign, createMachine } from "xstate";
import Todos from "../pages/todos";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiAIxaAnBQBMANgAc9144DMzu3YAsLgA0IACeiAC0-vYUAKxesQDsiY6JWsmx-s5eAL45IUI4BCScEvSkjEJsYABONag1FAYANioAZg0AthSFIiXitOWVMnIKSqaauuZGsCZqpOZWCBGxrokUds5a21qO9taOayHhyy7Occ6Jrq5e1gn+yWt5BTJFopxVmGWQrADCNWAVGBMOQAO7TYwTRaILyuawUfyeRyxLRrQ6OaxJY6RWyxCjOfzRNaxWLWLJXOzPEC9YpiHojL6DH4AETAzTAymB6jAENmUKQlkQSX8cWiBLuWlh-lJ2OWgS8+K89i8AVczgx1ipNPeA0kFWkLEwAFE6g0fhZYMogRRcG1OTUABR7bYASlY2v61EGUk+JvqAIgvLmZgFSyi6oRSq01jSSrc6VlETJjgoKV2rn8dm8t2cWtefTp-0Bqn1YMwyhkFAAyoRUKCpB0ap1MGQDABXZSsABiXRbpHbykwRFwFUgQf5oCWyVTMYC-hVXnnaq8ssX8LcKpRPlRqrzGDenqLKikZYrGGrtfr+sbzdbHdYVbbACNOiZx-NoQhF1onK47ErrACAkfAeWVrGceE7C0dVJUOG5PHSPdhFpTgjxLRhT0rKtcG4KQz1QdhuS4UheAEel9wLVCAWPUswFBcssJwvCZHkEjFGPdRtD0AUZmDBZQyFVwnBcFw1mXRIVWsRMJLidws1uRI7HiNxHCQg9C2o9CQTohjz2w3D9Xw1han9JpWmUG9yOQnUKDQk8dPw6smMMlixg4yZuMMSEPwEr9ETidJkWuG50gk1d-HXG4lMlLY-0RNTKMoOzaPooyAHEsArTBa06HkeO8kNJ0iQ48T8TM-FiOw1VSSVE0yChUXsaDAOSS4kliBKUMoVl2S0xyazrZj92aYhLVYHqOTyry+R8oqEESTEEQzJItBRRxAniRM4RFRFknW1bEQeDr8mpfMuooCa+srS7gSMjhKAUMiPTpS6htQC62Um3TUFY3hxnmLj30KwUEF8JxUXiVUtECCDEkTAkHFSEkqpjLw0f-TqbNelzzxu77jNNRoWnaLorPUzhscYRy8fw372ImQH8pm4GljahFJS8Rx1r8LZEliRN5UVZVVXVaxNRO56Kc+q6MFYDKGOy1BcqB-i5oiEqNgCKrod8LZwOk+dFXAtJMggy5XExz1Ke+zATLNCBWAtK1ORtO1aidHY3Ul7rpbe23CbHJm+M-NwhLJVFANiNx4jCsIcQCX9F2JKrnFJcWTtIdA4HMb2vT1YYWBVz8Ik5vFkUSRE1UJXxHETVIHGgq5XCj4KucpCWzpsz5vkDIOJxBzIFQgqOFL54U4bj5YlTxO5bAJG4DkU-xLbpMofQZP17aL3yIgghVtj8Owx7uWE7Hhn9Vh3ZvB4riLl47ijzuSjCHKwy8G17O9lG3ubFI2CvrDVUzJkB4E8TiYjxGKPYCQo6IjRhbB+1lDyaXsqlRiBkqYyB-iDYBqYUQeG8BKZuYFHAOCghBKCPhloEhXlRYsqDvrYKWPEGcS95z-iXNkWUUcNjNXcCqCu6pNi0J9r1N6F5Bo4ywCNS0TDEDRBTGkOwgCR7RkxGAyICENhrAkutJIgDkQiI+mIqRxivr4TkaDeqmQTb2GFKiFck9d5wicGPLWElAHQyMdbCxfdZogy8FcVM+xm7ZDUViJxf4FRVWSIEQIcI+btxeI-LGvspH+39IHaawdfJXHWJkG4VDshJF8ImMWKYyTREUlBdwFcJIiMsbvQJDV7B+GPvAs+TjNjnBiYkYeKprgBDyHkIAA */
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
