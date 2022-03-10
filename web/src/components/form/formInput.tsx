import React from 'react'
import { Controller, Control, ValidationRule } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'

interface FormInputProps {
  name: string
  label?: string
  control: Control<any, any>
  type?: React.HTMLInputTypeAttribute
  errorobj: Record<string, unknown>
  required?: boolean
  errormessage?: string
  disabled?: boolean
  defaultValue?: string
  pattern?: ValidationRule<RegExp>
}

const FormInput: React.FC<FormInputProps> = (props): JSX.Element => {
  const {
    name,
    label,
    control,
    type,
    errorobj,
    required,
    disabled,
    errormessage,
    defaultValue,
    pattern: patternProps,
  } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      rules={{ required, pattern: patternProps }}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <TextField
          type={type}
          label={label}
          error={isError}
          helperText={required ? errormessage : null}
          FormHelperTextProps={{
            style: {
              marginTop: 5,
              marginLeft: 0,
            },
          }}
          fullWidth
          variant="outlined"
          disabled={disabled}
          defaultValue={defaultValue}
          InputLabelProps={{
            className: required ? 'required-label' : '',
            required: required || false,
          }}
          onChange={onChange}
          ref={ref}
        />
      )}
      {...props}
    />
  )
}

export default FormInput
