/**
 * @file RegisterEnterprise.tsx
 * @description A reusable React component for rendering a responsive enterprise registration form.
 * Converts width and height from pixels to responsive units based on screen size.
 * @date May 11, 2025
 */

import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import ActionButton from "../UI/ActionButton";
import Logo from "../UI/unitec/Logo";
import InputField from "../UI/form/InputField";
import TextBox from "../UI/form/TextBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './RegisterEnterprise.module.css'

/**
 * A React functional component that renders a registration form for enterprises inside a responsive window.
 * Handles form state, input validation, and submission to the backend. Includes fields for enterprise name, email, password, website, and description.
 *
 * @component
 * @returns {JSX.Element} A styled window containing the enterprise registration form.
 *
 * @example
 * ```tsx
 * <RegisterEnterprise />
 * ```
 */
const RegisterEnterprise: React.FC = () => {
    // State variables for form inputs
    const [enterpriseName, setEnterpriseName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [website, setWebsite] = useState('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState<ReactElement | null>(null);
    const [passError, setPassError] = useState<ReactElement | null>(null);
    const [error, setError] = useState<ReactElement | undefined>();
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const [isCorrectPass, setIsCorrectPass] = useState<boolean>(true);
    const navigate = useNavigate()

    function getWrongPassText(passTry: string, confirmPassTry: string) {
        setConfirmPassword(confirmPassTry);
        setPassword(passTry);
        if (passTry !== confirmPassTry) {
            setIsCorrectPass(false);
            setPassError(<span className={styles.error}>Las contraseñas no coinciden.</span>);

        } else {
            setPassError(<></>);
            setIsCorrectPass(true);
        }
    }
    function getWrongEmailText(emailTry: string) {
        setEmail(emailTry);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailTry && !emailRegex.test(emailTry)) {
            setIsCorrect(false);
            setEmailError(<span className={styles.error}>El correo electrónico no es válido.</span>);

        } else {
            setIsCorrect(true);
            setEmailError(null);
        }
    }

    function valueForm() : boolean{
        return !(!isCorrect || !isCorrectPass || email.trim() === "" || password.trim() === "" || enterpriseName.trim() === "" || description.trim() === "");
    }

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        if (!valueForm()) return setError(<span className={'error'}>Por favor, complete todos los campos correctamente.</span>);
        try {
            const response = await axios.post(`/session/user-register.php`, {
                name: enterpriseName,
                email,
                password,
                portfolio: website,
                user_type: 1, // 1 for enterprise
                description: description
            });
            if (response) {
                alert("Registro exitoso. Debe esperar aprobación de su cuenta, porfavor sea paciente.");
                navigate('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) return setError(<span className="error">{error.response?.data?.message || "No se ha podido registrar. Intente de nuevo más tarde."}</span>);
            setError(<span className="error">No se ha podido establecer la conexión. Intentelo de nuevo más tarde.</span>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`${styles['app-window']} app-window`}>
                <Logo className={styles['logo-responsive']} logo_size={140} logo_text_size={40} vertical={true} />
                <span className={`${styles['top-title']} title top-section`} >
                    Registro de la Empresa
                </span>
                <form
                    name="register-enterprise"
                    id="register-enterprise"
                    className={styles['register-form']}
                    onSubmit={handleRegister}
                >
                    <div className={`${styles['vertical-sections']} vertical-sections`}>
                        <InputField
                            style={{ width: '306px' }}
                            className={styles['InputField']}
                            name="name-enterprise"
                            type="text"
                            placeholder="Nombre de la Empresa"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEnterpriseName(event.target.value)}
                        />
                        <InputField
                            style={{ width: '306px' }}
                            className={styles['InputField']}
                            name="mail-enterprise"
                            type="text"
                            placeholder="Correo Electrónico"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                getWrongEmailText(event.target.value);
                            }
                            }
                        />
                        {emailError}
                        <InputField
                            style={{ width: '306px' }}
                            className={styles['InputField']}
                            name="password-enterprise"
                            type="password"
                            placeholder="Contraseña"

                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                getWrongPassText(event.target.value, confirmPassword)}
                        />
                        <InputField
                            style={{ width: '306px' }}
                            className={styles['InputField']}
                            name="password-confirm-enterprise"
                            type="password"
                            placeholder="Confirmar Contraseña"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                getWrongPassText(password, event.target.value);
                            }}
                        />
                        {passError}
                        <InputField
                            style={{ width: '306px' }}
                            className={styles['InputField']}
                            name="website-enterprise"
                            type="text"
                            placeholder="Enlace a su Página Web (Opcional)"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setWebsite(event.target.value)}
                        />
                        <TextBox
                            className={styles['TextBox']}
                            width={'306px'}
                            height={'90px'}
                            name="description-enterprise"
                            placeholder="Descripción"
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
                        />
                    </div>
                    <hr />
                    <div className={`${styles['vertical-sections']} vertical-sections`} >
                         <span className={`${styles['form-text']} form-text `}>Si has rellenado todos los campos necesarios solo queda:</span>
                        <ActionButton height={'50px'} className={'action-button'} text={"Registrarse"} loading={loading} action={(event) => {
                            event.preventDefault();
                            const form = document.getElementById("register-enterprise") as HTMLFormElement;
                            if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));

                        }} />
                        {error}
                        <div className={'delimiter'}></div>
                        <span className={`${styles['form-text']} form-text`}>
                            Registrarse como <Link to={'/register-user'} className={`${styles['golden-link']} golden-link`}>Estudiante</Link><br />
                            ¿Ya tienes cuenta? <Link to={'/'} className={`${styles['golden-link']} golden-link`}>Iniciar Sesión</Link>
                        </span>
                    </div>
                </form>
            </div>
        </>

    );
};

export default RegisterEnterprise;