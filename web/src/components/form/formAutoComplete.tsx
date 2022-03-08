import React from 'react'
import { Controller, Control } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from '@material-ui/lab/Autocomplete'

type FormAutoCompleteProps = {
  name: string
  options: any[]
  isReady: boolean
  getOptionLabel: (data: any) => string
  groupBy?: (option: any) => string
  label?: string
  control: Control<any, any>
  errorobj: Record<string, unknown>
  required?: boolean
  errormessage?: string
  disabled?: boolean
  onChange?: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void
}

const FormAutoComplete: React.FC<FormAutoCompleteProps> = (props) => {
  const {
    name,
    label,
    getOptionLabel,
    groupBy,
    control,
    errorobj,
    required,
    disabled,
    errormessage,
    options,
    isReady: isReadyProps,
    onChange: onChangeProps,
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
      render={({ field: { onChange } }) =>
        isReadyProps ? (
          <Autocomplete
            fullWidth
            onChange={(event, value, reason) => {
              if (onChangeProps && typeof onChangeProps === 'function') {
                onChangeProps(event, value, reason)
              }

              return onChange(event)
            }}
            options={options}
            groupBy={groupBy}
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => (
              <TextField
                {...params}
                error={isError}
                helperText={required ? errormessage : null}
                InputLabelProps={{
                  className: required ? 'required-label' : '',
                  required: required || false,
                }}
                label={label}
                variant="outlined"
              />
            )}
          />
        ) : (
          <TextField value="On load..." variant="outlined" />
        )
      }
      {...props}
    />
  )
}

export default FormAutoComplete
