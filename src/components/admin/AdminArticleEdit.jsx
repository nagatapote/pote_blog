import { useState, useEffect, useCallback } from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import marked from "marked";
import { ImageArea } from "./ImageArea";
import { saveArticle } from "redux/articles/operations";
import { TextInput, SelectBox } from "components/index";
import { db } from "firebase/index";

export const AdminArticleEdit = () => {
  const dispatch = useDispatch();

  const toolbar = [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "image",
    "|",
    "guide",
  ];

  let id = window.location.pathname.split("/admin/articleEdit")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const categories = [
    { id: "雑記", name: "雑記" },
    { id: "お金", name: "お金" },
    { id: "プログラミング", name: "プログラミング" },
    { id: "ミニマリスト", name: "ミニマリスト" },
  ];

  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");

  const inputTitle = useCallback(
    (event) => {
      setTitle(event.target.value);
    },
    [setTitle]
  );

  const inputContent = useCallback(
    (e) => {
      setContent(e);
    },
    [setContent]
  );

  useEffect(() => {
    if (id !== "") {
      db.collection("articles")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setName(data.name);
          setTitle(data.title);
          setContent(data.content);
          setImages(data.images);
          setCategory(data.category);
        })
        .catch(() => {
          alert("記事が存在しません。");
          dispatch(push("/admin"));
        });
    }
  }, [id]);

  useEffect(() => {
    db.collection("users")
      .orderBy("username", "asc")
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            id: data.username,
            name: data.username,
          });
        });
        setNames(list);
      });
  }, []);

  return (
    <div className="center">
      <h1>記事の投稿・編集</h1>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch(push("/admin/articleEditList"))}
      >
        記事一覧(投稿・編集)に戻る
      </Button>
      <div className="space-l" />
      <div className="centerLeft">
        <ImageArea images={images} setImages={setImages} />
        <SelectBox
          label={"投稿者"}
          required={true}
          options={names}
          select={setName}
          value={name}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <TextInput
          halfWidth={false}
          label={"記事名"}
          multiline={false}
          required={true}
          rows={1}
          value={title}
          type={"text"}
          onChange={inputTitle}
        />
        <div className="space-l" />
        <SimpleMDE
          value={content}
          onChange={inputContent}
          options={{ toolbar: toolbar }}
        />
        <div className="space-l" />
        <h1 className="center">記事投稿プレビュー</h1>
        <h2>記事名：{title}</h2>
        <span dangerouslySetInnerHTML={{ __html: marked(content) }} />
        <div className="space-l" />
      </div>
      <div className="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(saveArticle(id, name, title, content, images, category))
          }
        >
          投稿する
        </Button>
      </div>
      <div className="space-l" />
    </div>
  );
};
