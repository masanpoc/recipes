import { IForm } from "../types/types";
export interface IState {
  inputValue: string;
  filters: { [key: string]: any };
  links: string[];
}

interface IActions {
  type: string;
  value: any;
}

export const resultsReducer = (state: IState, action: IActions): any => {
  if (action.type == "SEARCH") {
    // console.log(state, 'prior search');
    // console.log( { ...state, inputValue: action.value }, 'new search')
    return { ...state, inputValue: action.value };
  }
  if (action.type == "FILTERS") {
    // console.log(action.value, "form submitted");
    // console.log(state, 'prior filters');
    // console.log( { ...state, filters: action.value }, 'new filters')
    return { ...state, filters: action.value };
  }
  if (action.type == "UPDATE_NEXT_AND_PREVIOUS_PAGE_LINK") {
    return {
      ...state,
      links: {
        previous: action.value[0],
        next: action.value[1],
      },
    };
  }
};
