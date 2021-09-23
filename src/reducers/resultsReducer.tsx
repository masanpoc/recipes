export interface IState {
  inputValue: string;
  filters: any;
  links: string[];
}

interface IActions {
  type: string;
  value: any;
}

export const resultsReducer = (state: IState, action: IActions): any => {
  if(action.type=='SEARCH'){
    return { ...state, inputValue: action.value };
  }
  if(action.type=='FILTERS'){
    console.log(action.value, 'form submitted')
    return { ...state, filters: action.value }
  }
  if(action.type=='UPDATE_NEXT_AND_PREVIOUS_PAGE_LINK'){
    return { ...state, links: {
      previous: action.value[0],
      next: action.value[1]
    }}
  }
};
