import { db, FirebaseTimestamp } from "firebase/index";
import { fetchArticlesAction, deleteArticlesAction } from "./actions";
import { push } from "connected-react-router";

const articlesRef = db.collection("articles");

export const deleteArticles = (id) => {
  return async (dispatch, getState) => {
    articlesRef
      .doc(id)
      .delete()
      .then(() => {
        const prevArticles = getState().articles.list;
        const nextArticles = prevArticles.filter(
          (article) => article.id !== id
        );
        dispatch(deleteArticlesAction(nextArticles));
      });
  };
};

export const fetchArticles = (category) => {
  return async (dispatch) => {
    let query = articlesRef.orderBy("updated_at", "desc");
    query = category !== "" ? query.where("category", "==", category) : query;

    query.get().then((snapshots) => {
      const articleList = [];
      snapshots.forEach((snapshot) => {
        const article = snapshot.data();
        articleList.push(article);
      });
      dispatch(fetchArticlesAction(articleList));
    });
  };
};

export const saveArticle = (id, name, title, content, images, category) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      title: title,
      content: content,
      images: images,
      category: category,
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = articlesRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return articlesRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        alert("投稿が完了しました。");
        dispatch(push("/admin"));
      })
      .catch(() => {
        alert("記事の投稿に失敗しました。ぽてに報告してください。");
        dispatch(push("/admin"));
      });
  };
};
