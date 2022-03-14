import { useEffect, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  Form,
  Label,
  PasswordField,
  EmailField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth()

  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      // navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="Email"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <EmailField
                      name="email"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={emailRef}
                      validation={{
                        required: true,
                      }}
                      required
                    />
                    <FieldError name="email" className="rw-field-error" />

                    <Label
                      name="New Password"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      New Password
                    </Label>
                    <PasswordField
                      name="new_password"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{
                        required: true,
                      }}
                      required
                    />
                    <FieldError
                      name="new_password"
                      className="rw-field-error"
                    />

                    <Label
                      name="Confirm Password"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Confirm New Password
                    </Label>
                    <PasswordField
                      name="confirm_new_password"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      validation={{
                        required: true,
                      }}
                      required
                    />
                    <FieldError
                      name="confirm_new_password"
                      className="rw-field-error"
                    />
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          <div className="rw-login-link">
            <div className="rw-login-link__item">
              <span>Back to </span>{' '}
              <Link to="/login" className="rw-link">
                Login Page
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
