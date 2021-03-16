import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listenAuthState } from "redux/users/operations";
import { getIsSignedIn } from "redux/users/selectors";

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};
