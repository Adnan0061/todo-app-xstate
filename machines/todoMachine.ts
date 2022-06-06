import { type } from "os";
import { createMachine } from "xstate";

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAkD2A3MAnABAWQEMBjACwEsA7MAOgBlUCJKocAVVCVWAYgBcOuOADYMIkRKAAOXMrzKoKEkAA9EAJgAMAFmoBmLQA4NATi261WrRoDsARgBsAGhABPRAFpbx+9QCsx3WMNe11fc18HawBfKOc0TFxCUkoaekZmNgEeEXSKFn5OHAAzAjIhcSQQaVhZeUVK1QR3XW0-a18NA1trAI1bMydXD27rahNdA0mDANtzUxjYkAoOOCV47Hxicio6UQz2TnhK6tqFJUb3f2pjCODTa31TX2tnNybbA10-AKDrNV8QvZbGpdDE4hgNkltjQDoI0mIIEoTnIzg1EF4dKYPvYZtpAjZXupRtZplp2sZPu17M8tGCQOtElsUrtcixYbAcABRLBYVBYCpSGQo+qgC66CbUYHGdoOGy2D4WQkINTE0nkykAml0hmbZJUJFCurnDy6exqSVqaURexyhVaJXuNQ4774szeCJaNQLKJAA */
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
              type: "todos failed";
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
          type;
        },
      },
    }
  );
