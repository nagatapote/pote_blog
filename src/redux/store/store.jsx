import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import { ArticlesReducer } from "redux/articles/reducers";
import { UsersReducer } from "redux/users/reducers";

export const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      articles: ArticlesReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
};
