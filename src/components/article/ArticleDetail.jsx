import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import HTMLReactParser from "html-react-parser";
import Button from "@material-ui/core/Button";
import marked from "marked";
import { db } from "firebase/index";

const returnCodeToBr = (text) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(marked(text));
  }
};

export const ArticleDetail = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/article/")[1];

  const [article, setArticle] = useState("");

  useEffect(() => {
    db.collection("articles")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setArticle(data);
      });
  }, [id]);

  return (
    <div className="center">
      <div className="centerLeft">
        {article && (
          <div>
            <h4>
              更新日：{article.updated_at.toDate().toLocaleDateString("ja")}
              　　作成日：{article.created_at.toDate().toLocaleDateString("ja")}
            </h4>
            <h4>
              カテゴリー：{article.category}　　投稿者：{article.name}
            </h4>
            <h2>記事名：{article.title}</h2>
            <p>{returnCodeToBr(article.content)}</p>
          </div>
        )}
        <div className="center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => dispatch(push("/"))}
          >
            トップページに戻る
          </Button>
        </div>
        <div className="space-l" />
      </div>
    </div>
  );
};
