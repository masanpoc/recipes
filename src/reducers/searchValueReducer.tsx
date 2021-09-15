export interface IState {
  inputValue: string;
  filters: any
}

interface IActions {
  type: string;
  value: any;
}

export const searchValueReducer = (state: IState, action: IActions): any => {
  if(action.type=='SEARCH'){
    return { ...state, inputValue: action.value };
  }
  if(action.type=='FILTERS'){
    return { ...state, filters: action.value }
  }
};
