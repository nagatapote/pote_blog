import { createSelector } from "reselect";

const articlesSelector = (state) => state.articles;

export const getArticles = createSelector(
  [articlesSelector],
  (state) => state.list
);
