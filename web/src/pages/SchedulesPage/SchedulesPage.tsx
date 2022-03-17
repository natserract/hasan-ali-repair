import React, { useMemo, useState, useCallback } from 'react'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import { SCHEDULES_QUERY, SCHEDULES_CURRENTSESSION_QUERY } from './query'
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
import { useAccess } from 'src/libs/gql-router'
import { useAuthState } from 'src/libs/auth/hooks'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const SchedulesPage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { currentUser } = useAuthState()
  const { currentRole } = useAccess()
  const isPublicAccess = currentRole === 'customer'

  const { data: scheduleSessionData, loading: loadingScheduleSession } =
    useQuery(SCHEDULES_CURRENTSESSION_QUERY)
  const scheduleSession = scheduleSessionData?.currentSessions

  const [updateBookingsFunc] = useMutation(BOOKINGSAPPOINTMENT_MUTATION, {
    refetchQueries: [SCHEDULES_QUERY],
  })

  const [changed, setChanged] = useState(false)
  const [listData, setListData] = useState([])

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
              // send_email: true,
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
        name: 'customer.user.email',
        label: 'Customer Email',
        options: {
          filter: false,
        },
      },
      {
        name: 'booking_date',
        label: 'Booking Date',
        options: {
          filter: true,
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

            // Assume if schedule has been processed as been complete, review
            // Make sure, not possible to change status anymore (schedules page)
            //
            // If want to change, please in services page
            const canChangesStatus = ['pending', 'approved', 'unapproved']
            const isCanChange = canChangesStatus.includes(data)

            return (
              <FormControl>
                <FormSelect
                  control={control}
                  errorobj={errors}
                  name="status"
                  onChange={(event) => handleChange(event, dataId)}
                  value={data}
                  disabled={isPublicAccess || !isCanChange}
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
            )
          },
        },
      },
    ],
    [control, errors, isPublicAccess, handleChange]
  )

  const renderInfo = useCallback(() => {
    if (!scheduleSession?.isMaximum) return <React.Fragment />

    return (
      <Paper
        style={{
          padding: 20,
          marginBottom: 20,
        }}
        elevation={1}
        variant="outlined"
      >
        <Typography color="error">
          We're sorry, but it is currently not possible to make booking, because
          quota limit! Please take to another date.
        </Typography>
      </Paper>
    )
  }, [scheduleSession])

  return (
    <>
      <MetaTags title="Bookings" description="Bookings page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {renderInfo()}

          <List
            isLoading={changed || loadingScheduleSession}
            title="Bookings"
            columns={columns}
            listQuery={SCHEDULES_QUERY}
            deleteMutation={DELETESCHEDULE_MUTATION}
            resourceName={props.resourceName}
            onFetch={(data) => setListData(data)}
            createDisabled={scheduleSession?.isMaximum}
            deleteDisabled={isPublicAccess}
            orderBy={{
              key: 'booking_date',
              sort: 'desc',
            }}
            options={{
              ...(isPublicAccess && {
                selectToolbarPlacement: 'none',
              }),
            }}
            editDisabled={(data) => {
              const rowIdx = data.rowIndex
              const status = data.tableData[rowIdx][4]

              // If status not pending, customer can't edit
              return isPublicAccess && status !== 'pending'
            }}
            input={{
              ...(isPublicAccess &&
                currentUser &&
                currentUser.id && {
                  // eslint-disable-next-line prettier/prettier
                  // Filter by status and user
                  // filter: `{\"status\":{\"in\":[\"pending\",\"approved\",\"unapproved\"]},\"customer\":{\"user_id\":{\"equals\":${currentUser.id}}}}`
                  //
                  // Filter only by user, user can see all
                  // bookings history with any status
                  filter: `{\"customer\":{\"user_id\":{\"equals\":${currentUser.id}}}}`,
                }),
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SchedulesPage
