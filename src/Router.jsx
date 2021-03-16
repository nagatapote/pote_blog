import { Route, Switch } from "react-router";
import { Auth } from "./Auth";
import { ArticleList, ArticleDetail } from "./components/article/index";
import {
  SignUp,
  SignIn,
  About,
  Admin,
  AdminArticleEditList,
  AdminArticleEdit,
} from "./components/admin/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"(/)?"} component={ArticleList} />
      <Route exact path={"/article/:id"} component={ArticleDetail} />
      <Auth>
        <Route exact path={"/admin"} component={Admin} />
        <Route
          exact
          path={"/admin/articleEditList"}
          component={AdminArticleEditList}
        />
        <Route
          path={"/admin/articleEdit(/:id)?"}
          component={AdminArticleEdit}
        />
      </Auth>
    </Switch>
  );
};

export default Router;
