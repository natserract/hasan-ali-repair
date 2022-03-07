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
  defaultValue?: string | number | readonly string[]
  disabled?: boolean
  multiple?: boolean
  onChange?: (
    event: React.ChangeEvent<{
      name?: string
      value: unknown
    }>,
    child: React.ReactNode
  ) => void
  renderValue?: (value: unknown) => React.ReactNode
  value?: any
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
    onChange: onChangeProps,
    disabled,
    multiple,
    renderValue,
    value,
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
            renderValue={renderValue}
            defaultValue={defaultValue ?? ''}
            disabled={disabled}
            onChange={(event) => {
              if (onChangeProps && typeof onChangeProps === 'function') {
                onChangeProps(event, <React.Fragment />)
              }

              return onChange(event)
            }}
            multiple={multiple}
            value={value}
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
