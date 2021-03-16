import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton, TextInput } from "components/index";
import { signUp } from "redux/users/operations";

export const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className="center">
      <h2>アカウント作成</h2>
      <TextInput
        halfWidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
      <div className="space-l" />
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
      <TextInput
        halfWidth={true}
        label={"パスワード（再確認）"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
      <div className="space-l" />
      <PrimaryButton
        label={"アカウントを作成する"}
        onClick={() =>
          dispatch(signUp(username, email, password, confirmPassword))
        }
      />
      <div className="space-l" />
    </div>
  );
};
