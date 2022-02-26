import React, { useRef } from 'react'
import {
  Form,
  Label,
  TextField,
  EmailField,
  PasswordField,
  FieldError,
  Submit,
  TelField,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { extractError } from 'src/utils/errors'
import { browserHistory } from 'src/utils/history'

const RegisterPage = () => {
  const classes = useStyles()

  const nameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const { signUp } = useAuth()

  const onSubmit = async (data) => {
    const { name, password, email, address, phone_number } = data

    try {
      const response = await signUp({
        name,
        email,
        password,
        user_type: 'customer',
        address,
        phone_number,
      })

      if (response) {
        toast.success('Register success. You must login first.')

        setTimeout(() => {
          browserHistory.push('/login')
        }, 1000)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <React.Fragment>
      <MetaTags title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="name"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Name
                  </Label>
                  <TextField
                    name="name"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={nameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Name is required',
                      },
                    }}
                  />
                  <FieldError name="name" className="rw-field-error" />

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
                    name="address"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Address
                  </Label>
                  <TextField
                    name="address"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  />
                  <FieldError name="address" className="rw-field-error" />

                  <Label
                    name="phone_number"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Phone Number
                  </Label>
                  <TelField
                    name="phone_number"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  />
                  <FieldError name="phone_number" className="rw-field-error" />

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

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <div className="rw-login-link__item">
              <span>Already have an account?</span>{' '}
              <Link to="/login" className="rw-link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default RegisterPage
