import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles(() => ({
  root: {
    width: "95%",
    margin: "0 auto",
  },
  content: {
    display: "flex",
    padding: "8px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 8,
    },
  },
}));

export const ArticleCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <CardActionArea>
            <div onClick={() => dispatch(push("/article/" + props.id))}>
              <Typography>更新日：{props.update}</Typography>
              <Typography>カテゴリー：{props.category}</Typography>
              <Typography>
                <h4>記事名：{props.title}</h4>
              </Typography>
            </div>
          </CardActionArea>
        </CardContent>
      </Card>
      <div className="space-l" />
    </div>
  );
};
