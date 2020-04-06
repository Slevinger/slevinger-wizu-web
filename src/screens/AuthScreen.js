import React, { useEffect } from "react";
import { SplitContent } from "../components/StyledComponents";
import AuthForm from "../Forms/AuthForm";
import { mobxConnect } from "../mobx/mobxConnect";

const AuthScreen = ({ tryLocalSignin }) => {
  useEffect(() => {
    (async () => {
      await tryLocalSignin();
    })();
  }, []);

  return (
    <SplitContent horizontal>
      <div
        style={{ backgroundColor: "rgba(255,255,255,0.2)", height: "100%" }}
      />
      <AuthForm />
    </SplitContent>
  );
};

export default mobxConnect(({ authStore: { user, tryLocalSignin } }) => ({
  user,
  tryLocalSignin
}))(AuthScreen);
