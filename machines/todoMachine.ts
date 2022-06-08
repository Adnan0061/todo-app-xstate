import { actions, assign, createMachine } from "xstate";
import Todos from "../pages/todos";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiAIwAOAJwUtAdgDMdgCwBWZ14BM1q7OAGwANCAAnogAtLZeTsF2WsnW9lr2zn5+AL7Z4UI4BCScEvSkjEJsYABO1ajVFAYANioAZvUAthQFIsXitGUVMnIKSqaauuZGsCZqpOZWCNGuWrYU-q5ersH2Hs4efl724VEI1ufrWq5pzs62zvautn7OufkyhaKclZilkKwAYWqYBUYEw5AA7lNjOMFogsvEvNYtMFbLZrtZ-MiwpEbO4nFcHEE4tsjsE3iAekUxN1hr8Bv8ACJgJpgZRgaEzWFISyIDxpCgebZaHzBF7Ba7OE4xYKIxK2LQBCU3RUUqlfShAkGqcrgsAQzDKGQUADKhFQEKk7WqHUwZAMAFdlKwAGKdO2kR3KTBEXDlSCc2ZmHmLaIBQXnMW7CUeTGrPzShC3awUdwOTFijN+Dxqj69GlalRSSGG41mi1W932p2sE0OgBGHRMge5oEW2ZTmIyfgVDi8zxCiaOKa8sesqNHaX55LylLz1M4hZ1jBLRowptw3Cka9Q7HUlAUAlpGE+fQoS+L+tL65Nm+3MnkpF4Yzm2j0POmQfmIb5mIo3dWK5rH5exo0TDEKHudwxTRJ4PA8WxcxPfNF2BItdVXMs711HdWBqOoGmaNpOmPYQF01NDlz1A0dw3LccIfUYi3UN8WzmOEEGzRwghCOJFTFPxtgTXEk2cFM03sLMsxzWd1TPZlWXZa9dw4A8n34QR5w1CgFLZMEd0fZ9mImd9DBhdifyWPxHHsAJkluElNlHKURLDIIKFSBUQMSXwYyQsjtN0pTcPw+pGhaZRrS6OSaSC-TGPUl8WMmD9zODNtEGcdIKGCA4lR8TEjkTMMvGCHL7AVHwMVAq5-NPWKWTZe8T1C4EIFYCxYGUUEKFwVp2WqAAKQ5kgASlYGLOCC5qsFagNUq5CyMoQUqyqRfx4JFSSxRxU5s3iWxZXRdIxRCewZ1nUh0DgcxJv6SRdUqNj0t5JZvEguzDieayiWE05QIJa4RUE7xHkOOqUM0lh6ToeazMWl7FngjxBUOkUHjsTJrETaxs0uIGtAOR40RyWStLPUopB+ABRWp6jhkBP1bV7llcVx1jcLYDgcCVEnA6xnEFNIHEEnZCYFiHyPPSjLxostzUtXUoo9L1nu-ZbolSDyvC2e5ghcFYHA8Ic4icMdUVsAXMWsSXtIvDCr1o296MYHc1Y464yrFYGhX2bwEKHI51jHHWo1xmT3mQqX7ZXR2ZHdyzone83rI8GM41sRMELW83tkO3Ldlt+TGuC+OFq-DiiaFuIhT2LYtq8Yq-B2DyKpFYJfK2Uci4axSZswOaIAT5aLYjPWVhRTJXD+xB3EF-lVhJfwjh7CO5yjjVh5ZzZBaqrme3O7Zsdc1wDlbrzDpqm3cmyIA */
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
        events: {} as { type: "Create new" } | { type: "Delete"; todo: string } | { type: "Form input changed"; value: string } | { type: "Submit" } | { type: "Clear input form" },
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
                target: "Todos Loaded",
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
            Delete: {
              target: "Delete todo",
            },
          },
        },
        "Loading Todos Errored": {},
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
        },
        "Delete todo": {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Deleting todo errored",
              },
            ],
          },
        },
        "Deleting todo errored": {
          after: {
            "2500": {
              target: "Todos Loaded",
            },
          },
        },
      },
    },
    {
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
