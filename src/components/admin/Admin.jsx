import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import Button from "@material-ui/core/Button";
import { getUserName } from "redux/users/selectors";
import { signOut } from "redux/users/operations";

export const Admin = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUserName(selector);
  return (
    <div className="center">
      <div className="centerLeft">
        <h1>管理画面</h1>
        <p>ようこそ！{username}さん</p>
        <div className="space-s" />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(push("/"))}
        >
          トップページに戻る
        </Button>
        <div className="space-l" />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(push("/admin/articleEditList"))}
        >
          記事一覧(投稿・編集)
        </Button>
        <div className="space-l" />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(signOut())}
        >
          ログアウト
        </Button>
        <div className="space-l" />
      </div>
    </div>
  );
};
