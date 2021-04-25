import React, {Dispatch, useReducer} from "react";

interface IConfigContext {
  menuCollapsed: boolean,
}

type ActionType = {
  type: "menu-unfold",
  [name: string]: any
}

let defaultState = {
  menuCollapsed: true,
} as IConfigContext;

const reducer = (prevState: IConfigContext, action: ActionType) => {
  switch (action.type) {
    case "menu-unfold":
      return {
        ...prevState,
        menuCollapsed: action.menuCollapsed
      };
  }
};

export const ConfigContext = React.createContext({} as { state: IConfigContext, dispatch: Dispatch<ActionType> });

export const ConfigProvider: React.FC = props => {
  let [state, dispatch] = useReducer(reducer, defaultState);

  return <ConfigContext.Provider {...props} value={{state, dispatch}}/>
};