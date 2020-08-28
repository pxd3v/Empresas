import React, { useState } from 'react';
import { ReactComponent as LockIcon } from '../../assets/icons/ic-cadeado.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/ic-email.svg';
import Logo2x from '../../assets/logo/logo-home@2x.png';
import useAuth from '../../hooks/useAuth';
import './styles.css';
export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const authContext = useAuth();

    const onChangeInputValue = (
        event: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>
    ): void => {
        setState(event.currentTarget.value);
    };

    const onSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        setIsLoading(true);
        event.preventDefault();
        try{
            await authContext.signIn({
                email,
                password,
            });
        } catch (err) {
            setErrorMessage(err);
        }
        setIsLoading(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="Login-Page-Container">
            <img src={Logo2x} alt="Logo ioasys"/>
            <h1 className="Text-Style-11">
        BEM-VINDO AO
                <br />
        EMPRESAS
            </h1>
            <h2>
        Lorem ipsum dolor sit amet, contetur <br /> adipiscing elit. Nunc
        accumsan.
            </h2>
            <form className="Form" onSubmit={async (event): Promise<void | undefined> => await onSubmit(event)}>
                <div className={errorMessage ? 'Input-Container-With-Error' : 'Input-Container'}>
                    <EmailIcon />
                    <input
                        type="text"
                        value={email}
                        onChange={(event): void => onChangeInputValue(event, setEmail)}
                        autoFocus
                    />
                    {errorMessage && <div className="Error-Icon">!</div>}
                </div>
                <div className={errorMessage ? 'Input-Container-With-Error' : 'Input-Container'}>
                    <LockIcon />
                    <input
                        type={showPassword && !isLoading ? 'text' : 'password'}
                        value={password}
                        onChange={(event): void => onChangeInputValue(event, setPassword)}
                    />
                    {!errorMessage &&
                        <button type="button" className="Show-Password-Button" onClick={toggleShowPassword} disabled={isLoading}/>
                    }
                    {errorMessage && <div className="Error-Icon">!</div>}
                </div>
                <div className="Error-Message">{errorMessage}</div>
                <button disabled={isLoading} className={isLoading ? 'Form-Submit-Button-Desativated': 'Form-Submit-Button'} type="submit">
          ENTRAR
                </button>
            </form>
        </div>
    );
};
