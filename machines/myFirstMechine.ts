import { createMachine } from "xstate";

export const myMachine = createMachine({
  initial: "NOT_HOVERED",
  states: {
    NOT_HOVERED: {
      on: {
        mouseOver: {
          target: "HOVERED",
        },
        overNOut: {
          target: "HOVERED",
        },
      },
    },
    HOVERED: {
      on: {
        mouseOut: {
          target: "NOT_HOVERED",
        },
        overNOut: {
          target: "NOT_HOVERED",
        },
      },
    },
  },
});
