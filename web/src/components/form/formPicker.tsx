import 'date-fns'
import React from 'react'
import { Controller, Control } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  DatePickerProps,
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
  shouldDisabledDate?: (day: Date) => boolean
}

const FormPicker: React.FC<FormPickerProps & Partial<DatePickerProps>> = (
  props
): JSX.Element => {
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
    shouldDisabledDate,
    ...restProps
  } = props

  let isError = false
  if (errorobj && Object.prototype.hasOwnProperty.call(errorobj, name)) {
    isError = true
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            clearable
            disableToolbar
            variant="dialog"
            format="yyyy/MM/dd"
            inputVariant="outlined"
            margin="normal"
            id="date-picker-inline"
            label={label}
            error={isError}
            fullWidth
            required={required}
            // See: https://material-ui-pickers.dev/api/DateTimePicker
            shouldDisableDate={shouldDisabledDate}
            helperText={required ? errormessage : null}
            value={value}
            onChange={(event) => {
              if (onChangeProps && typeof onChangeProps === 'function') {
                onChangeProps(event, value)
              }

              return onChange(event)
            }}
            {...restProps}
          />
        </MuiPickersUtilsProvider>
      )}
    />
  )
}

export default FormPicker
