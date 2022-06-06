import { actions, assign, createMachine } from "xstate";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWQEMBjACwEsA7MAOgBlUCJKocAVVCVWAYk6usrpUAaxppMuQqUo16jZmw5cEg1EQIAXMqgoBtAAwBdRKAAOXMlp0mQAD0QAmfQ+oB2AKwAWAMyv9r708ANgAObwBOABoQAE9EAFoARndE6ndw7xC-fX1w91zwzwBfIujxbHxicn45JgoWdk4ebCxULGpTABtNADM2gFtqcskqmToGOoalWBUKIXUrPSMbc1hLbQobewR4h3Dw6gygnODXcJD9RM9PaLid5NT0iMTE70SHIMT9IJLSkAoOHAbMNKtIahMFI0uCsLIstgl9tRPPoQu49hE8i8wrcEokwmkMuF-A53EFvJ8HN4SmUMBUpNUaFDYDhapAYWs4Ug7IhEoVDp48UEMl8fETXDiEA5XG4QoUPOdfKT3K5in8QfSxrVIdMcABRLCtLBsrmrdbWLnbeLeTLUd7hDyJY6uLEOG6xRzS1yyzzysIeILK1U0iSghnss2bC0JckuO0Op0ut13XakgmZEIvdLpe1U35AA */
  createMachine(
    {
      tsTypes: {} as import("./todoMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
      },
      id: "Hover Machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                target: "Todos Loaded",
                actions: "assignTodosToContext",
              },
            ],
            onError: [
              {
                target: "Loading Todos Errored",
                actions: "assignErrorToContext",
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
