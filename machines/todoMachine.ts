import { type } from "os";
import { createMachine } from "xstate";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWQEMBjACwEsA7MAOgBlUCJKocAVVCVWAYgBcOuOADYMIkRKAAOXMrzKoKEkAA9EAJgAMAFmoBmLQA4NATi261WrRoDsARgBsAGhABPRAFpbx+9QCsx3WMNe11fc18HawBfKOc0TFxCUkoaekZmNgEeEXSKFn5OHAAzAjIhcSQQaVhZeUVK1QR3XW0-a2NrLWNfDV0HL2c3Jq8ff0CNXwM1e0MjXRjYkAoOOCV47Hxicio6UQz2TnhK6tqFJUb3f2pu22DTa31TX2tBj1sDXT8AoOs1XxD7LY1PNFutElsUtQDoI0mIIEoTnIzg1EFo1NR7JiTLp9LprAYDPY1K8mr50V47F4OgDbFpbDE4hgNkltqk9nlMoccABRLBYVBYCpSGRI+qgC5U663LwmDTYixOVweMnUCm2KnWGl0hkgMGbZJUBEiurnDzmAxtDpdHp9QHGEnuabGL66AktOlqdXGBZRIA */
  createMachine(
    {
      tsTypes: {} as import("./todoMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | {
              type: "todos loaded";
              todos: string[];
            }
          | {
              type: "loading todo failed";
              errorMessage: string;
            },
      },
      id: "Hover Machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          on: {
            "todos loaded": {
              actions: "alertTodoLoaded",
              target: "Todos Loaded",
            },
            "loading todo failed": {
              actions: "alertTodoFailed",
              target: "Loading Todos Errored",
            },
          },
        },
        "Todos Loaded": {},
        "Loading Todos Errored": {},
      },
    },
    {
      actions: {
        alertTodoLoaded: (context, event) => {
          alert(JSON.stringify(event.todos));
        },
        alertTodoFailed: (context, event) => {
          alert(JSON.stringify(event.errorMessage));
        },
      },
    }
  );
