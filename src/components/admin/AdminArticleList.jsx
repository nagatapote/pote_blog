import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AdminArticleCard } from "./index";
import { getArticles } from "redux/articles/selectors";
import { fetchArticles } from "redux/articles/operations";

export const AdminArticleList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const articles = getArticles(selector);

  const query = selector.router.location.search;
  const category = /^\?category=/.test(query)
    ? query.split("?category=")[1]
    : "";

  useEffect(() => {
    dispatch(fetchArticles(category));
  }, [query]);

  return (
    <section>
      <div>
        {articles.length > 0 &&
          articles.map((article) => (
            <AdminArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              category={article.category}
              name={article.name}
              date={article.created_at.toDate().toLocaleDateString("ja")}
              update={article.updated_at.toDate().toLocaleDateString("ja")}
            />
          ))}
      </div>
    </section>
  );
};
