import React, { useReducer } from "react";

interface IDemoContext {
  value: number
}

let defaultState: IDemoContext = {
  value: 0
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "add":
      return {
        ...prevState,
        value: prevState.value + action.value
      };
    case "delete":
      return {
        ...prevState,
        value: prevState.value - action.value
      };
    default: {
      return prevState;
    }
  }
};

export const DemoContext = React.createContext({} as any);

export const DemoProvider: React.FC = props => {
  let [demoState, dispatch] = useReducer(reducer, defaultState);

  return <DemoContext.Provider {...props} value={{ demoState, dispatch }}/>;
};