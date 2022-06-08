// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
    assignErrorToContext:
      | "error.platform.Todo Machine.Loading Todos:invocation[0]"
      | "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]";
    assignFormInputToContext: "Form input changed";
    clearInputForm: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
  };
  internalEvents: {
    "done.invoke.Todo Machine.Loading Todos:invocation[0]": {
      type: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo Machine.Loading Todos:invocation[0]": {
      type: "error.platform.Todo Machine.Loading Todos:invocation[0]";
      data: unknown;
    };
    "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "error.platform.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
    };
    "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]": {
      type: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.Todo Machine.Deleting todo.Delete todo:invocation[0]": {
      type: "error.platform.Todo Machine.Deleting todo.Delete todo:invocation[0]";
      data: unknown;
    };
    "xstate.after(2000)#Todo Machine.Loading Todos Errored": {
      type: "xstate.after(2000)#Todo Machine.Loading Todos Errored";
    };
    "done.invoke.Todo Machine.Deleting todo.Delete todo:invocation[0]": {
      type: "done.invoke.Todo Machine.Deleting todo.Delete todo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.Todo Machine.Loading Todos:invocation[0]";
    saveTodo: "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]";
    deleteTodo: "done.invoke.Todo Machine.Deleting todo.Delete todo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "saveTodo" | "deleteTodo";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos:
      | "xstate.after(2000)#Todo Machine.Loading Todos Errored"
      | "Go to home"
      | "done.invoke.Todo Machine.Creating new todo.Saving todo:invocation[0]"
      | "done.invoke.Todo Machine.Deleting todo.Delete todo:invocation[0]";
    saveTodo: "Submit";
    deleteTodo: "Delete";
  };
  eventsCausingGuards: {
    "Has todos": "done.invoke.Todo Machine.Loading Todos:invocation[0]";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Loading Todos"
    | "Todos Loaded"
    | "Loading Todos Errored"
    | "Creating new todo"
    | "Creating new todo.Showing form input"
    | "Creating new todo.Saving todo"
    | "Deleting todo"
    | "Deleting todo.Showing todo list"
    | "Deleting todo.Delete todo"
    | "Deleting todo errored"
    | {
        "Creating new todo"?: "Showing form input" | "Saving todo";
        "Deleting todo"?: "Showing todo list" | "Delete todo";
      };
  tags: never;
}
