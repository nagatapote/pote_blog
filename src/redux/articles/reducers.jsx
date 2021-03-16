import * as Actions from "./actions";
import { initialState } from "redux/store/initialState";

export const ArticlesReducer = (state = initialState.articles, action) => {
  switch (action.type) {
    case Actions.DELETE_ARTICLES:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_ARTICLES:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};
