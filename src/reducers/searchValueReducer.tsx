export interface IState {
  inputValue: string;
}

interface IActions {
  type: string;
  value: any;
}

export const searchValueReducer = (state: IState, action: IActions): any => {
  return { ...state, inputValue: action.value };
};
