export const DELETE_ARTICLES = "DELETE_ARTICLES";
export const deleteArticlesAction = (articles) => {
  return {
    type: "DELETE_ARTICLES",
    payload: articles,
  };
};

export const FETCH_ARTICLES = "FETCH_ARTICLES";
export const fetchArticlesAction = (articles) => {
  return {
    type: "FETCH_ARTICLES",
    payload: articles,
  };
};
