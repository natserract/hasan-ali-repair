import React from 'react'
import { Controller, Control } from 'react-hook-form'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

interface FormInputProps {
  name: string
  label?: string
  control: Control<any, any>
  errorobj: Record<string, unknown>
  required?: boolean
  errormessage?: string
  defaultValue: string
}

const FormInput: React.FC<FormInputProps> = (props): JSX.Element => {
  const {
    name,
    label,
    defaultValue,
    control,
    errorobj,
    required,
    errormessage,
  } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      rules={{ required: required }}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <FormControl variant="outlined">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            error={isError}
            inputProps={{
              className: required ? 'required-label' : '',
              required: required || false,
            }}
            defaultValue={defaultValue}
            onChange={onChange}
            ref={ref}
          >
            {props.children}
          </Select>
          <FormHelperText>{errormessage}</FormHelperText>
        </FormControl>
      )}
      {...props}
    />
  )
}

export default FormInput
