import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;

          db.collection("users")
            .doc(uid)
            .get()
            .then((snapshot) => {
              const data = snapshot.data();

              dispatch(
                signInAction({
                  isSignedIn: true,
                  role: data.role,
                  uid: uid,
                  username: data.username,
                })
              );
              dispatch(push("/admin"));
            });
        }
      })
      .catch((error) => {
        alert("入力した情報が間違っています。");
      });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "admin",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              alert("アカウントの登録が完了しました。");
              dispatch(push("/"));
            });
        }
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/"));
    });
  };
};

/** 使う時のために。
export const ResetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert(
            "入力されたアドレスにパスワードリセット用のメールをお送りしました"
          );
          dispatch(push("/"));
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。");
        });
    }
  };
};
*/
