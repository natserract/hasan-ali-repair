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
  type?: React.HTMLInputTypeAttribute
  errorobj: Record<string, unknown>
  required?: boolean
  errormessage?: string
  disabled?: boolean
}

const FormPicker: React.FC<FormPickerProps> = (props): JSX.Element => {
  const {
    name,
    label,
    control,
    type,
    errorobj,
    required,
    disabled,
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
      render={({ field: { onChange, ref } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label={label}
            value=""
            error={isError}
            fullWidth={true}
            helperText={required ? errormessage : null}
            // value={selectedDate}
            onChange={onChange}
            ref={ref}
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
