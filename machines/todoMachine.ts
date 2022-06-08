import { actions, assign, createMachine } from "xstate";
import Todos from "../pages/todos";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALqJQAB1nFV6-SAAeiAEwB2ABwUtAVnsA2V7YDMWt1t-OADQgAJ6IALQAjG7WFPb2WgAstm72AJxukdYAvtnBQjgEJJwS9KSMQmxgAE7VqNUUBgA2KgBm9QC2FAUixeK0ZRUycgpKppq65kawJmqk5lYI4daRaRTOXgkxtmnWWl5pwWEIXl4Uqc7WPmmRWjfOzpG5+TKFopyVmKWQrADC1WAVGBMOQAO5TYzjBaILyRRIURIZaLWZyJNxpLQ7IKhRAbCiReyXaIY+xeRKwtLPEA9IpibrDL4DH4AETATTAyjAEJmUKQllxOwRKw2kQcPmsbjcRwicLOmySOySd2saXsVJp70o-0BqnKILAoMwyhkFAAyoRUKCpO1qh1MGQDABXZSsABinXtpCdykwRFw5Ug3NmZj5izctnW3nsiTRNzStgJkWlCHRZ2c-iu9lsMY2GXVr16dO1KikYKNJvNlutHodztYpsdACMOiYg7zQItTlp8YlLlprNYYxkMtjjo8zrYB4jopP++j8xg3n0KMXdYwy8aMGbcNwpJvUOx1JQFAJ6YvC5xV6WDeWt6ad3uZPJSLwxnNtHo+dNg-NQ7ikhQaTOLYDwxrY+zuF4Uo4iccJOKiiTuP4qQDr4C7CLSl4AiWeobhWD56vurA1HUDTNG0nRnhhmortha76oa+7bruhFPqMJbqB+bZzNCJybBQUGws4Nz2NEtyjogqbrBmmzZr2BxuOhS50qy7KcreB4cMeL78IIBaYZQqkcsC+7Pq+HETJ+hiQjxf4IMJThuDGkpeOBLiRF4ElLEJTgzhKpJZjsTx5NS+k0UZ6lESR9SNC0yg2l0GrLhFJlsTpb6cZMX42SGHaIDsjjbOimISmkvb2Mm4SnPCjzhmSpVaB5aEhUlKlshyj6LtFAIQKwFiwMoQIULgrSctUAAUKL+AAlKwrWcBFnVYN1gbZTytl5SmDzSZiBIrL2iJedEjgKpEqJaIS2apF4uQhaQ6BwOY839JIeqVNxuX8gg5L4k5MaBVc8auMmKz4oSA6ksBwFJGqLVhcunzfBAH2-ptGxnMkZ1eHs2a3DsyZouc4NXA8VweOSSkXi9gzSCwmAAKK1PUq3Wetn2LMsMbrPEviNfViLWCDBznJOwoC416TOJTBm0Tq16MRWFpWnqCWet6KO8eicQ+Bd5MJLYOzQWOmIUAOg5xokjXWPYORw+eMtXrhN5MfeLGMPuGt2YhzjnC4aSqpcqqJKKBOiRQovJFmRJW9LNGO+uzsyJ7m0-cBmzOXGCaiYkBMXeHU6bFc7mZIpdvUcl7WRUna0-rxjyOIhluim4PjotblVkhGjV1YJnmuGdscV2pS2YCtyM1+2X0GxGluJFcCYxJEtxJjBgMi6h0YgdDmKD2IydfcsqTc1sfNzwLlVz923feBKLfW+BN23UAA */
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
