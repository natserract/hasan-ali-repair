import { MetaTags } from '@redwoodjs/web'
import { CREATEPART_MUTATION } from './mutation'
import { useForm } from 'react-hook-form'
import Create from 'src/components/common/create'
import FormControl from '@material-ui/core/FormControl'
import FormInput from 'src/components/form/formInput'
import FormPicker from 'src/components/form/formPicker'
import { useState } from 'react'
import NumberFormat from 'react-number-format'

const CreatePartPage = (props) => {
  const form = useForm({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [price, setPrice] = useState(NaN)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <MetaTags title="Create Part" description="Create Part page" />

      <Create
        form={form}
        createMutation={CREATEPART_MUTATION}
        resourceName={props.resourceName}
        input={({ price: _price, part_number, qty, ...data }) => ({
          ...data,
          price,
          part_number: +part_number,
          qty: +qty,
        })}
      >
        <FormControl variant="outlined">
          <FormPicker
            control={control}
            label="Stock In Date"
            name="in_date"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="name"
            label="Name"
            errorobj={errors}
            required
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="part_number"
            type="number"
            label="Part Number"
            errorobj={errors}
            required
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="qty"
            label="Qty"
            errorobj={errors}
            inputProps={{
              maxLength: 4,
            }}
            required
          />
        </FormControl>

        <FormControl>
          <NumberFormat
            control={control}
            name="price"
            label="Price (per pcs)"
            errorobj={errors}
            customInput={FormInput}
            thousandSeparator
            prefix={'Rp.'}
            onValueChange={(value) => {
              setPrice(value.floatValue)
            }}
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="description"
            label="Description"
            errorobj={errors}
          />
        </FormControl>
      </Create>
    </>
  )
}

export default CreatePartPage
