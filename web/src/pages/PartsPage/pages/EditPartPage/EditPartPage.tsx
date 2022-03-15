import React, { useEffect, useState } from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { EDITPART_MUTATION } from './mutation'
import { SHOWPART_QUERY } from '../ShowPartPage/query'
import FormControl from '@material-ui/core/FormControl'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import { useParams } from 'src/libs/gql-router'
import Edit from 'src/components/common/edit'
import FormPicker from 'src/components/form/formPicker'
import NumberFormat from 'react-number-format'

const EditPartPage = (props) => {
  const params = useParams()

  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { data: partData, loading: loadingPartData } = useQuery(
    SHOWPART_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const part = partData?.part

  const [selectedDate, setSelectedDate] = useState('')
  const [price, setPrice] = useState(part?.price)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    if (part && part.in_date) {
      setSelectedDate(part.in_date)
    }
  }, [part])

  if (!part) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Part" description="Edit Part page" />

      <Edit
        form={form}
        editMutation={EDITPART_MUTATION}
        id={+params?.id}
        input={({
          price: _price,
          in_date: _in_date,
          part_number,
          qty,
          ...data
        }) => ({
          ...data,
          price,
          in_date: selectedDate,
          part_number: part_number ? +part_number : undefined,
          qty: qty ? +qty : undefined,
        })}
        resourceName={props.resourceName}
        showQuery={SHOWPART_QUERY}
        isLoading={loadingPartData}
      >
        <FormControl variant="outlined">
          <FormPicker
            control={control}
            label="Stock In Date"
            name="in_date"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="name"
            label="Name"
            errorobj={errors}
            defaultValue={part?.name}
          />
        </FormControl>

        <FormControl>
          <FormInput
            control={control}
            name="part_number"
            type="number"
            label="Part Number"
            errorobj={errors}
            defaultValue={part?.part_number}
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
            defaultValue={part?.qty}
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
            defaultValue={part?.price}
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
            defaultValue={part?.description}
            errorobj={errors}
          />
        </FormControl>
      </Edit>
    </>
  )
}

export default EditPartPage
