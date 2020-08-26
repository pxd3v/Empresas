import React, { useState, useEffect } from "react";
import "./styles.css";
import { ReactComponent as LockIcon } from "../../assets/icons/ic-cadeado.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/ic-email.svg";
import Logo2x from "../../assets/logo/logo-home@2x.png";
import useAuth from "../../hooks/useAuth";
export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authContext = useAuth();

  const onChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.currentTarget.value);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await authContext.signIn({
      email: "testeapple@ioasys.com.br",
      password: "12341234",
    });
  };
  // useEffect(() => {
  //   const load = async () => {
  //     const teste = await signIn("a", "a");
  //     console.log(teste);
  //   };
  //   load();
  // }, []);
  return (
    <div className="Login-Page-Container">
      <img src={Logo2x} alt="Logo ioasys" className="Logo" />
      <h1 className="Text-Style-11">
        BEM-VINDO AO
        <br />
        EMPRESAS
      </h1>
      <h2>
        Lorem ipsum dolor sit amet, contetur <br /> adipiscing elit. Nunc
        accumsan.
      </h2>
      <form className="Form" onSubmit={async (event) => await onSubmit(event)}>
        <div className="Input-Container">
          <EmailIcon />
          <input
            type="text"
            value={email}
            onChange={(event) => onChangeInputValue(event, setEmail)}
          />
        </div>
        <div className="Input-Container">
          <LockIcon />
          <input
            type="password"
            value={password}
            onChange={(event) => onChangeInputValue(event, setPassword)}
          />
        </div>
        <button className="Form-Submit-Button" type="submit">
          ENTRAR
        </button>
      </form>
    </div>
  );
};
