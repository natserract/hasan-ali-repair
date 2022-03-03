import React, { useEffect, useRef } from 'react'
import useStyles from './styles'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import {
  Form,
  Label,
  EmailField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Link } from 'react-router-dom'
import { browserHistory } from 'src/utils/history'

const LoginPage = () => {
  const classes = useStyles()
  const { logIn, reauthenticate } = useAuth()

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await logIn({
        email: data.email,
        password: data.password,
      })

      if (response.error) {
        toast.error(response.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

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
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <EmailField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                    }}
                  />
                  <FieldError name="email" className="rw-field-error" />

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
                    <Link to="/forgot-password" className="rw-forgot-link">
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
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
