import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Button from "@material-ui/core/Button";
import { AdminArticleList } from "./index";

export const AdminArticleEditList = () => {
  const dispatch = useDispatch();
  return (
    <div className="center">
      <h1>記事一覧(投稿・編集)</h1>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => dispatch(push("/admin"))}
      >
        管理画面に戻る
      </Button>
      <div className="space-l" />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => dispatch(push("/admin/articleEdit"))}
      >
        記事投稿
      </Button>
      <div className="space-l" />
      <AdminArticleList />
      <div className="space-l" />
    </div>
  );
};
