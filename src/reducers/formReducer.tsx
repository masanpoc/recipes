import {IForm} from '../types/types'

interface IActions {
    type: string;
    value: {
      input: string;
      selected: string[];
    };
  }
  
  export const formReducer = (state:  { [key: string]: any }, action: IActions): any => {
    if(action.type=='UPDATE_INPUT'){
      return { ...state, [action.value.input]: action.value.selected };
    }
  };