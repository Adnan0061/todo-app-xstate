import { actions, assign, createMachine } from "xstate";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWQEMBjACwEsA7MAOgBlUCJKocAVVCVWAYk6usrpUAaxppMuQqUo16jZmw5cEg1EQIAXMqgoBtAAwBdRKAAOXMlp0mQAD0QBGABwB2agDYALE4cBmfT4uAU4ATO4ANCAAnogAtA4uDtT6AJy+KfqeQf4O7iEhAL4FkeLY+MTk-HJMFCzsnDzYWKhY1KYANpoAZi0AttSlkhUydAw1dUqwKhRC6lZ6RjbmsJbaFDb2CLG+fskuKS6eAKx5IfouLhHRcQlJqemZ2fq5+UXFIBQccDaD5dJVYwU9S4Sws8w2cUS1BS7iOvh87ncTm8JxSkRiW2cvmoRzSGRcIROvncDhCviKJQwZSklRowNgOGqkFBK3BSDsjhSnmhnmc7jSDkyDxc6MQITcLicXJcuKcvhlsMOFJAvxpI2qQMmOAAolhmlhmezlqtrOzNtt4dRSQcjrlzg4saKEOLqJLpbL5Scjkr3qrhlQWSb1ma4sSQlaQja7YlHdctoT3Di8fo8k53Klnkc3gUgA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
      },
      tsTypes: {} as import("./todoMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      id: "Hover Machine",
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
        "Todos Loaded": {},
        "Loading Todos Errored": {},
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
      },
    }
  );
