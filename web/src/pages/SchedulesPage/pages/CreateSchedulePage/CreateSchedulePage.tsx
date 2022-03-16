import { MetaTags, useQuery } from '@redwoodjs/web'
import FormPicker from 'src/components/form/formPicker'
import { useForm } from 'react-hook-form'
import Create from 'src/components/common/create'
import {
  VEHICLES_QUERY,
  CUSTOMERS_QUERY,
  SCHEDULE_CURRENTSESSION,
} from './query'
import { useAuthState } from 'src/libs/auth/hooks'
import { CREATESCHEDULE_MUTATION } from './mutation'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { useAccess } from 'src/libs/gql-router'
import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { parseDate } from 'src/utils/date'
import FormHelperText from '@material-ui/core/FormHelperText'

const vehicleEmptyMessage = `Vehicle's not yet selected or empty's`

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

  const [customerId, setCustomerId] = useState(NaN)
  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    VEHICLES_QUERY,
    {
      variables: {
        input: {
          filter: JSON.stringify({
            // If admin based on selected customer
            // Else if admin, based on login currentUser?.id
            user_id: customerId || currentUser?.id || undefined,
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

  const { data: sessionSchedule, loading: loadingSessionSchedule } = useQuery(
    SCHEDULE_CURRENTSESSION
  )
  const schedule = sessionSchedule?.currentSessions

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const isVehiclesReady =
    vehiclesData && vehiclesData.vehicles && vehiclesData.vehicles.length

  return (
    <>
      <MetaTags title="Create Schedule" description="Create Schedule page" />

      <Create
        isLoading={
          vehiclesLoading || customersLoading || loadingSessionSchedule
        }
        form={form}
        createMutation={CREATESCHEDULE_MUTATION}
        resourceName={props.resourceName}
        input={({ booking_date: _booking_date, ...data }) => ({
          ...data,
          booking_date: selectedDate,
          ...(!isAdmin && {
            customer_id: customersData?.customers[0]?.id,
          }),
        })}
      >
        <FormControl>
          <FormPicker
            minDate={new Date()}
            shouldDisabledDate={(date) => {
              const uiDate = parseDate(date)
              const sessionDates = schedule?.schedules.map((v) =>
                parseDate(v.booking_date)
              )
              const isMaximum =
                sessionDates.includes(uiDate) && schedule?.isMaximum

              return isMaximum
            }}
            control={control}
            label="Booking Date"
            name="booking_date"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
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
              onChange={(e) => {
                const value = e.target.value
                if (value) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  const item = Array.from(customersData.customers).find(
                    (v: { id: number }) => v.id === value
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ) as any
                  console.log('selected user id', item?.user_id)
                  setCustomerId(item?.user_id)
                }
              }}
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
          {/* Avoid warning */}
          {isVehiclesReady ? (
            <FormSelect
              label="Select Vehicle"
              name="vehicle_id"
              control={control}
              errorobj={errors}
              disabled={(isAdmin && !customerId) || !isVehiclesReady}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {vehiclesData &&
                vehiclesData?.vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} - {vehicle.serialNum}
                  </MenuItem>
                ))}
            </FormSelect>
          ) : (
            <TextField
              variant="outlined"
              disabled
              value={vehicleEmptyMessage}
            />
          )}
        </FormControl>

        {isAdmin && (
          <FormControl>
            <FormSelect
              label="Select Status"
              control={control}
              errorobj={errors}
              name="status"
              defaultValue="pending"
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
            required
          />
          <FormHelperText>
            Please fill in completely your vehicle's problems
          </FormHelperText>
        </FormControl>
      </Create>
    </>
  )
}

export default CreateSchedulePage
