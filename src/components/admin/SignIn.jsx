import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "components/index";
import { signIn } from "redux/users/operations";

export const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  return (
    <div className="center">
      <h2>ログイン画面</h2>
      <TextInput
        halfWidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <div className="space-l" />
      <TextInput
        halfWidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <div className="space-l" />
      <div>
        <PrimaryButton
          label={"ログイン"}
          onClick={() => dispatch(signIn(email, password))}
        />
        <div className="space-l" />
      </div>
    </div>
  );
};
