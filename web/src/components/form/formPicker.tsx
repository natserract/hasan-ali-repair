import 'date-fns'
import React from 'react'
import { Controller, Control } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

interface FormPickerProps {
  name: string
  label?: string
  control: Control<any, any>
  errorobj: Record<string, unknown>
  value: any
  required?: boolean
  errormessage?: string
  disabled?: boolean
  onChange?: (date: Date, value?: string) => void
}

const FormPicker: React.FC<FormPickerProps> = (props): JSX.Element => {
  const {
    name,
    label,
    control,
    value,
    errorobj,
    required,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    disabled,
    onChange: onChangeProps,
    errormessage,
  } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      rules={{ required }}
      control={control}
      render={({ field: { onChange } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label={label}
            error={isError}
            fullWidth={true}
            helperText={required ? errormessage : null}
            value={value}
            onChange={(event) => {
              if (onChangeProps && typeof onChangeProps === 'function') {
                onChangeProps(event, value)
              }

              return onChange(event)
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      )}
      {...props}
    />
  )
}

export default FormPicker
