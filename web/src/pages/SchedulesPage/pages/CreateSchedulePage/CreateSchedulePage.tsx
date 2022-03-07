import { MetaTags, useQuery } from '@redwoodjs/web'
import FormPicker from 'src/components/form/formPicker'
import { useForm } from 'react-hook-form'
import Create from 'src/components/common/create'
import { VEHICLES_QUERY, CUSTOMERS_QUERY } from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { CREATESCHEDULE_MUTATION } from './mutation'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { useAccess } from 'src/libs/gql-router'
import { useState } from 'react'

const CreateSchedulePage = (props) => {
  const { currentUser } = useAuthState()
  const { currentRole } = useAccess()

  const isAdmin = currentRole === 'admin'

  const form = useForm({
    mode: 'onSubmit',
  })
  const {
    formState: { errors },
    control,
  } = form

  const [selectedDate, setSelectedDate] = useState(new Date())

  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    VEHICLES_QUERY,
    {
      variables: {
        input: {
          ...(!isAdmin && {
            filter: JSON.stringify({
              user_id: currentUser?.id,
            }),
          }),
        },
      },
    }
  )
  const { data: customersData, loading: customersLoading } = useQuery(
    CUSTOMERS_QUERY,
    {
      variables: {
        input: {
          ...(!isAdmin && {
            filter: JSON.stringify({
              user_id: currentUser?.id,
            }),
          }),
        },
      },
    }
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <MetaTags title="Create Schedule" description="Create Schedule page" />

      <Create
        isLoading={vehiclesLoading || customersLoading}
        form={form}
        createMutation={CREATESCHEDULE_MUTATION}
        resourceName={props.resourceName}
        input={(data) => ({
          ...data,
          ...(!isAdmin && {
            customer_id: customersData?.customers[0]?.id,
          }),
        })}
      >
        <FormControl>
          <FormPicker
            control={control}
            label="Booking Date"
            name="booking_date"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </FormControl>

        {/* Only admin can select customer */}
        {isAdmin && (
          <FormControl>
            <FormSelect
              label="Select Customer"
              name="customer_id"
              control={control}
              errorobj={errors}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {customersData?.customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.user.name}
                </MenuItem>
              ))}
            </FormSelect>
          </FormControl>
        )}

        <FormControl>
          <FormSelect
            label="Select Vehicle"
            name="vehicle_id"
            control={control}
            errorobj={errors}
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {vehiclesData?.vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.name} - {vehicle.serialNum}
              </MenuItem>
            ))}
          </FormSelect>
        </FormControl>

        {isAdmin && (
          <FormControl>
            <FormSelect
              label="Select Status"
              control={control}
              errorobj={errors}
              name="status"
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="pending">
                <em>Pending</em>
              </MenuItem>
              <MenuItem value="on review">
                <em>On Review</em>
              </MenuItem>
              <MenuItem value="approved">
                <em>Approved</em>
              </MenuItem>
              <MenuItem value="on progress">
                <em>On Progress</em>
              </MenuItem>
              <MenuItem value="complete">
                <em>Complete</em>
              </MenuItem>
            </FormSelect>
          </FormControl>
        )}

        <FormControl>
          <FormInput
            control={control}
            name="message"
            label="Message"
            errorobj={errors}
          />
        </FormControl>
      </Create>
    </>
  )
}

export default CreateSchedulePage
