import React from 'react'
import { Controller, Control } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'

interface FormInputProps {
  name: string
  label?: string
  control: Control<any, any>
  type?: React.HTMLInputTypeAttribute
  errorobj: Record<string, unknown>
  required?: boolean
  errormessage?: string
}

const FormInput: React.FC<FormInputProps> = (props): JSX.Element => {
  const { name, label, control, type, errorobj, required, errormessage } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      rules={{ required: required }}
      control={control}
      render={({ field }) => (
        <TextField
          type={type}
          label={label}
          error={isError}
          helperText={required ? errormessage : null}
          fullWidth={true}
          variant="outlined"
          InputLabelProps={{
            className: required ? 'required-label' : '',
            required: required || false,
          }}
          {...field}
        />
      )}
      {...props}
    />
  )
}

export default FormInput
