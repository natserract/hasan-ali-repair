import React, { useMemo, useState, useCallback } from 'react'
import { MetaTags, useMutation } from '@redwoodjs/web'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import { SCHEDULES_QUERY } from './query'
import { parseDate } from 'src/utils/date'
import {
  DELETESCHEDULE_MUTATION,
  BOOKINGSAPPOINTMENT_MUTATION,
} from './mutation'
import MenuItem from '@material-ui/core/MenuItem'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'
import { useForm } from 'react-hook-form'
import FormControl from '@material-ui/core/FormControl'
import FormSelect from 'src/components/form/formSelect'

const SchedulesPage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const [updateBookingsFunc] = useMutation(BOOKINGSAPPOINTMENT_MUTATION, {
    refetchQueries: [SCHEDULES_QUERY],
  })

  const [changed, setChanged] = useState(false)

  const handleChange = useCallback(
    async (event, id) => {
      const value = event.target.value
      setChanged(true)

      try {
        await updateBookingsFunc({
          variables: {
            id,
            input: {
              status: value,
            },
          },
        })
        toast.success('Schedule status succesfully changed')
      } catch (error) {
        toast.error(extractError(error).message)
      } finally {
        setChanged(false)
      }
    },
    [updateBookingsFunc]
  )

  const columns = useMemo(
    () => [
      {
        name: 'id',
        label: 'Id',
        options: {
          display: false,
          filter: false,
        },
      },
      {
        name: 'customer.user.name',
        label: 'Customer Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'booking_date',
        label: 'Booking Date',
        options: {
          filter: false,
          customBodyRender: (data) => {
            return parseDate(new Date(data))
          },
        },
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          filter: true,
          customBodyRender: (data, rowData) => {
            const index = rowData.rowIndex
            const dataId = rowData.tableData[index][0]

            return (
              <FormControl>
                <FormSelect
                  control={control}
                  errorobj={errors}
                  name="status"
                  onChange={(event) => handleChange(event, dataId)}
                  value={data}
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
            )
          },
        },
      },
    ],
    [control, errors, handleChange]
  )

  return (
    <>
      <MetaTags title="Bookings" description="Bookings page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            isLoading={changed}
            title="Bookings"
            columns={columns}
            listQuery={SCHEDULES_QUERY}
            deleteMutation={DELETESCHEDULE_MUTATION}
            resourceName={props.resourceName}
            editDisabled={(data) => {
              console.log('edit disabled', data)

              return true
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SchedulesPage
