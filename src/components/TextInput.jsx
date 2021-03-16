import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    width: "80%",
  },
  half: {
    width: "50%",
  },
});

export const TextInput = ({
  halfWidth,
  label,
  multiline,
  required,
  rows,
  value,
  type,
  onChange,
}) => {
  const classes = useStyles();
  const textStyle = halfWidth ? classes.half : classes.root;

  return (
    <TextField
      className={textStyle}
      label={label}
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
};
