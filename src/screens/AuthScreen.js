import React from "react";
import { SplitContent } from "../components/StyledComponents";
import AuthForm from "../Forms/AuthForm";

export default () => {
  return (
    <SplitContent horizontal>
      <div style={{ backgroundColor: "rgba(255,255,255,0.7)" }} />
      <AuthForm />
    </SplitContent>
  );
};
