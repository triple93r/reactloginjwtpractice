import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authService } from "../../Api/auth.service";
import langContextObj from "../../Stores/langContext";
import LoginContext from "../../Stores/loginContext";
import classes from "./Login.module.scss";

const Login: React.FC = () => {
    const [loginState, setLoginState] = useState({
        mobile: '',
        password: '',
        fcm_token: "xyz"
    });

    const loginCtx = useContext(LoginContext);
    const langCtx = useContext(langContextObj);
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorMessageRef = useRef<HTMLSpanElement>(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const OnChange = (value: any, name: any) => {
        setLoginState((data: any) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const loginAPi = async () => {
        try {
            const response: any = await authService.login(loginState)
            authService.setItem('token', response?.data?.token)
            // authService.setItem('token', response?.data?.data[0]?.token)
            // setToken(response.data.token)
            hasToken = await authService.getItem('token') || ''
            if (hasToken !== '') {
                if (hasToken) {
                    loginCtx.toggleLogin();
                    navigate("/dashboard");
                } else {
                    // userNameRef.current.focus();
                    errorMessageRef.current?.setAttribute(
                        "style",
                        "display: inline-block;opacity: 1"
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    let hasToken = '';
    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        loginAPi();
    }

    return (
        <div className={`${classes.container} ${langCtx.lang === "fa" ? classes.rtl : ""}`}>
            <div className={classes.loginBox}>
                <h2 className={classes.title}>{t("loginPage")}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='mobile' value={loginState.mobile} onChange={(e: any) => OnChange(e.target.value, 'mobile')} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={loginState.password} onChange={(e: any) => OnChange(e.target.value, 'password')} />
                       
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e: any) => OnChange(e.target.checked, 'rememberMe')} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Login