import { useEffect, useRef, useState } from 'react'
// import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  Form,
  Label,
  PasswordField,
  EmailField,
  Submit,
  FieldError,
  useForm,
} from '@redwoodjs/forms'
import { Link } from 'react-router-dom'
import { AuthClient } from 'src/libs/auth/client'
import { useNavigate } from 'src/libs/gql-router'
import { toastPromise } from 'src/utils/info'

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const formMethods = useForm()

  const emailRef = useRef<HTMLInputElement>()
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = async (data) => {
    setIsDisabled(true)

    try {
      const response = await AuthClient.forgotPassword({
        email: data.email,
        new_password: data.new_password,
      })

      if (response.error) {
        toast.error(response.error)
      } else {
        toastPromise(
          'Reset password success. Please login again.',
          'success',
          1000
        ).finally(() => {
          navigate.push('/login')
        })
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsDisabled(false)
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
                <Form
                  formMethods={formMethods}
                  onSubmit={onSubmit}
                  className="rw-form-wrapper"
                >
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
                      onChange={(_event) => {
                        const values = formMethods.getValues()
                        const password = values.new_password
                        const confirmPassword = values.confirm_new_password

                        if (confirmPassword !== password) {
                          formMethods.setError(
                            'confirm_new_password',
                            {
                              message:
                                'Confirm password must same with new password!',
                            },
                            {
                              shouldFocus: true,
                            }
                          )
                        } else {
                          formMethods.clearErrors('confirm_new_password')
                        }
                      }}
                      required
                    />
                    <FieldError
                      name="confirm_new_password"
                      className="rw-field-error"
                    />
                  </div>

                  <div className="rw-button-group">
                    <Submit
                      disabled={isDisabled}
                      className="rw-button rw-button-blue"
                    >
                      Submit
                    </Submit>
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
