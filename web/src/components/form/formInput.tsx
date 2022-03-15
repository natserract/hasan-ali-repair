import React from 'react'
import {
  Controller,
  Control,
  ValidationRule,
  RegisterOptions,
} from 'react-hook-form'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

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
  value?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  readOnly?: boolean
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
}

const FormInput: React.FC<FormInputProps & Partial<TextFieldProps>> = (
  props
): JSX.Element => {
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
    value,
    onChange: onChangeProps,
    readOnly,
    rules,
  } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      rules={{
        // required,
        pattern: patternProps,
        ...rules,
      }}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <TextField
          type={type}
          label={label}
          error={isError}
          value={value}
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
          required={required}
          InputLabelProps={{
            className: required ? 'required-label' : '',
            required: required || false,
          }}
          InputProps={{
            readOnly,
          }}
          onChange={(event) => {
            if (onChangeProps && typeof onChangeProps === 'function') {
              onChangeProps(event)
            }

            return onChange(event)
          }}
          ref={ref}
          {...props}
        />
      )}
    />
  )
}

export default FormInput
