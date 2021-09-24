import { IForm } from "../types/types";

interface IActions {
  type: string;
  value: {
    input: string;
    selected: string[];
    checked: boolean;
  };
}

export const formReducer = (
  state: { [key: string]: any },
  action: IActions
): any => {
  if (action.type == "UPDATE_INPUT") {
    const newState = { ...state };
    if (action.value.checked) {
      newState[action.value.input].push(action.value.selected);
    } else {
      const indexEl = newState[action.value.input].indexOf(
        action.value.selected
      );
      newState[action.value.input].splice(indexEl, 1);
    }
    console.log(newState);
    return newState;
  }
};
