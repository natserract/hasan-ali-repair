import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  // TextField,
  Fade,
} from "@material-ui/core";
import classnames from "classnames";
import useStyles from "./styles";
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Link } from "react-router-dom";
import { browserHistory } from "src/utils/history";

const LoginPage = () => {
  const classes = useStyles();
  const { isAuthenticated, logIn } = useAuth()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState("");
  const [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  const [passwordValue, setPasswordValue] = useState("password");

  useEffect(() => {
    if (isAuthenticated) {
      browserHistory.push('/app/dashboard')
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={console.log} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to="/"
                      className="rw-forgot-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <div className="rw-login-link__item">
              <span>Don&apos;t have an account?</span>{' '}
              <Link to="/register" className="rw-link">
                Sign up!
              </Link>
            </div>

            <div className="rw-login-link__item">
              <span style={{ padding: "0 5px" }}>or maybe you</span>
              <Link to="/register" className="rw-link">
                Forgot Password
            </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
