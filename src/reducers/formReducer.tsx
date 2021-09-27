import { IForm } from "../types/types";

interface IActions {
  type: string;
  value: {
    input: string;
    selected: string[];
    checked: boolean;
    isActive: boolean;
  };
}


export const formReducer = (
  state: { [key: string]: any },
  action: IActions 
): any => {
  if (action.type == "UPDATE_INPUT") {
    const newState = { ...state };
    if (action.value.checked) {
      newState.filters[action.value.input].push(action.value.selected);
    } else {
      const indexEl = newState.filters[action.value.input].indexOf(
        action.value.selected
      );
      newState.filters[action.value.input].splice(indexEl, 1);
    }
    console.log(newState.filters);
    return newState;
  }
  if(action.type == "UPDATE_DISPLAY") {
    const newState = {...state};
    newState.isActive=action.value.isActive;
    console.log(newState);
    return newState
  }
};
