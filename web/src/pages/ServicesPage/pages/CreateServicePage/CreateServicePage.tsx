import { MetaTags, useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormAutoComplete from 'src/components/form/formAutoComplete'
import { CREATESERVICE_MUTATION } from './mutation'
import Create from 'src/components/common/create'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import {
  MECHANICS_QUERY,
  CREATESERVICE_SCHEDULES_QUERY,
  CREATESERVICE_PARTSQUERY,
} from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { parseDate } from 'src/utils/date'
import { useState } from 'react'

const CreateServicePage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser } = useAuthState()

  const { data: schedulesData, loading: loadingSchedulesData } = useQuery(
    CREATESERVICE_SCHEDULES_QUERY,
    {
      variables: {
        input: {
          // eslint-disable-next-line prettier/prettier
          filter: "{\"status\":{\"in\":[\"approved\"]}}",
        },
      },
    }
  )
  const { data: mechanicsData, loading: mechanicsLoading } =
    useQuery(MECHANICS_QUERY)
  const { data: partsData, loading: partsDataLoading } = useQuery(
    CREATESERVICE_PARTSQUERY
  )

  const [inputValue, setInputValue] = useState(NaN)

  return (
    <>
      <MetaTags title="CreateService" description="CreateService page" />

      <Create
        isLoading={mechanicsLoading || loadingSchedulesData}
        form={form}
        createMutation={CREATESERVICE_MUTATION}
        resourceName={props.resourceName}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        input={(data) => ({
          mechanic_id: data.mechanic_id,
          schedule_id: inputValue,
          status: data?.status,
          price: data?.price ? +data?.price : undefined,
          created_by: currentUser?.id,
        })}
      >
        <FormControl>
          {/* Only show schedule based on status `on review` */}
          <FormAutoComplete
            required
            label="Select Schedules"
            name="schedule_id"
            control={control}
            errorobj={errors}
            isReady={!loadingSchedulesData}
            options={schedulesData?.schedules}
            onChange={(event, value) => setInputValue(value.id)}
            getOptionLabel={(option: any) => {
              return `Customer: ${option.customer.user.name}, Email: ${
                option.customer.user.email
              }, Date: ${parseDate(option.booking_date)}, Vehicle: ${
                option.vehicle.name
              }`
            }}
          />
        </FormControl>
        <FormControl>
          <FormSelect
            label="Select Mechanic"
            name="mechanic_id"
            control={control}
            errorobj={errors}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mechanicsData?.mechanics.map(
              (mechanic) =>
                mechanic.is_active && (
                  <MenuItem key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </MenuItem>
                )
            )}
          </FormSelect>
        </FormControl>
        <FormControl>
          <FormInput
            control={control}
            name="price"
            label="Price"
            errorobj={errors}
          />
        </FormControl>

        <FormAutoComplete
          required
          multiple
          label="Select Parts Used"
          name="part_id"
          control={control}
          errorobj={errors}
          isReady={!partsDataLoading}
          options={partsData?.parts}
          // onChange={(event, value) => setInputValue(value.id)}
          getOptionLabel={(option: any) => {
            return `${option.name} - ${option.part_number}`
          }}
        />
      </Create>
    </>
  )
}

export default CreateServicePage
