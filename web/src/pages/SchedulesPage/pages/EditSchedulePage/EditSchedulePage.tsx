import React, { useEffect, useState } from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
import {
  EDITSCHEDULE_SHOWSCHEDULE_QUERY,
  EDITSCHEDULECUSTOMERS_QUERY,
  EDITSCHEDULEVEHICLES_QUERY,
} from './query'
import { EDITSCHEDULE_MUTATION } from './mutation'
import Edit from 'src/components/common/edit'
import FormInput from 'src/components/form/formInput'
import FormSelect from 'src/components/form/formSelect'
import FormPicker from 'src/components/form/formPicker'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { useAuthState } from 'src/libs/auth/hooks'
import { useAccess, useParams } from 'src/libs/gql-router'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'

const vehicleEmptyMessage = `Vehicle's not yet selected or empty's`

const EditSchedulePage = (props) => {
  const params = useParams()
  const { currentUser } = useAuthState()
  const { currentRole } = useAccess()

  const isAdmin = currentRole === 'admin'

  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { data: scheduleData, loading: loadingScheduleData } = useQuery(
    EDITSCHEDULE_SHOWSCHEDULE_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const schedule = scheduleData?.schedule

  const { data: customersData, loading: customersLoading } = useQuery(
    EDITSCHEDULECUSTOMERS_QUERY,
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

  const [customerId, setCustomerId] = useState(NaN)
  const { data: vehiclesData, loading: vehiclesLoading } = useQuery(
    EDITSCHEDULEVEHICLES_QUERY,
    {
      variables: {
        input: {
          filter: JSON.stringify({
            // If admin based on selected customer
            // Else if admin, based on login currentUser?.id
            user_id: customerId,
          }),
        },
      },
      skip: !customerId,
    }
  )

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    setSelectedDate(schedule?.booking_date)

    if (isAdmin) {
      setCustomerId(schedule?.customer?.user?.id)
    } else {
      setCustomerId(currentUser?.id)
    }
  }, [currentUser?.id, isAdmin, schedule])

  const isVehiclesReady =
    vehiclesData && vehiclesData.vehicles && vehiclesData.vehicles.length

  console.log('vehiclesData', vehiclesData, currentUser?.id)

  if (!schedule) return <React.Fragment />

  return (
    <>
      <MetaTags title="Edit Schedule" description="Edit Schedule page" />

      <Edit
        form={form}
        editMutation={EDITSCHEDULE_MUTATION}
        id={+params?.id}
        input={({ booking_date: _booking_date, ...data }) => ({
          ...data,
          booking_date: selectedDate,
        })}
        resourceName={props.resourceName}
        showQuery={EDITSCHEDULE_SHOWSCHEDULE_QUERY}
        isLoading={loadingScheduleData || customersLoading || vehiclesLoading}
      >
        <FormControl>
          <FormPicker
            minDate={new Date()}
            control={control}
            label="Booking Date"
            name="booking_date"
            errorobj={errors}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <FormHelperText>
            Important: better pick date 3 days before take service
          </FormHelperText>
        </FormControl>

        {/* Only admin can select customer */}
        {isAdmin && (
          <FormControl>
            <FormSelect
              useKey
              disabled
              label="Select Customer"
              name="customer_id"
              control={control}
              errorobj={errors}
              // Issues: "[Select] You have provided an out-of-range value"
              // Solved: https://github.com/mui/material-ui/issues/18494#issuecomment-782042971
              defaultValue={customersData ? schedule?.customer?.id : undefined}
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {customersData &&
                customersData?.customers.map((customer) => (
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
              useKey
              label="Select Vehicle"
              name="vehicle_id"
              control={control}
              errorobj={errors}
              defaultValue={isVehiclesReady ? schedule?.vehicle?.id : undefined}
              disabled={!isVehiclesReady}
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
              useKey
              label="Select Status"
              control={control}
              errorobj={errors}
              defaultValue={schedule?.status}
              name="status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="pending">
                <em>Pending</em>
              </MenuItem>
              <MenuItem value="approved">
                <em>Approved</em>
              </MenuItem>
              <MenuItem value="unapproved">
                <em>Unapproved</em>
              </MenuItem>
              <MenuItem disabled value="on review">
                <em>On Review</em>
              </MenuItem>
              <MenuItem disabled value="on progress">
                <em>On Progress</em>
              </MenuItem>
              <MenuItem disabled value="cancelled">
                <em>Cancelled</em>
              </MenuItem>
              <MenuItem disabled value="complete">
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
            defaultValue={schedule?.message}
          />
          <FormHelperText>
            Please fill in completely your vehicle's problems
          </FormHelperText>
        </FormControl>
      </Edit>
    </>
  )
}

export default EditSchedulePage
