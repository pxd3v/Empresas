import React from "react";
import useAuth from "../hooks/useAuth";

export const Main: React.FC = () => {
  const authContext = useAuth();
  
  return <button onClick={authContext.signOut}>Main</button>;
};
