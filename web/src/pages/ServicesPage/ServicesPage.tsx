import { MetaTags, useMutation } from '@redwoodjs/web'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import { SERVICESPAGE_SERVICES_QUERY } from './query'
import {
  DELETESERVICE_MUTATION,
  SERVICES_UPDATESCHEDULEMUTATION,
} from './mutation'
import { useCallback, useMemo, useState } from 'react'
import { parseDate } from 'src/utils/date'
import FormSelect from 'src/components/form/formSelect'
import { useForm } from 'react-hook-form'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { useAccess } from 'src/libs/gql-router'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'
import { useAuthState } from 'src/libs/auth/hooks'

const ServicesPage = (props) => {
  const form = useForm()
  const {
    formState: { errors },
    control,
  } = form

  const { currentUser } = useAuthState()
  const { currentRole } = useAccess()
  const isPublicAccess = currentRole === 'customer'

  const [updateBookingsFunc] = useMutation(SERVICES_UPDATESCHEDULEMUTATION, {
    refetchQueries: [SERVICESPAGE_SERVICES_QUERY],
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
            },
          },
        })
        toast.success('Service status succesfully changed')
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
        name: 'schedule.customer.user.name',
        label: 'Customer Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'schedule.status',
        label: 'Status',
        options: {
          filter: true,
          customBodyRender: (data, rowData) => {
            const index = rowData.rowIndex
            const dataId = listData[index].schedule.id

            return (
              <FormControl>
                <FormSelect
                  control={control}
                  errorobj={errors}
                  name="status"
                  onChange={(event) => handleChange(event, dataId)}
                  value={data}
                  disabled={isPublicAccess}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="on progress">
                    <em>On Progress</em>
                  </MenuItem>
                  <MenuItem value="cancelled">
                    <em>Cancelled</em>
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
      {
        name: 'schedule.vehicle.name',
        label: 'Vehicle',
        options: {
          filter: false,
        },
      },
      {
        name: 'mechanic.name',
        label: 'Mechanic',
        options: {
          filter: false,
        },
      },
      {
        name: 'schedule.booking_date',
        label: 'Booking Date',
        options: {
          filter: false,
          customBodyRender: (data) => {
            return parseDate(new Date(data))
          },
        },
      },
    ],
    [control, errors, handleChange, isPublicAccess, listData]
  )

  return (
    <>
      <MetaTags title="Services" description="Services page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            isLoading={changed}
            columns={columns}
            onFetch={(data) => setListData(data)}
            listQuery={SERVICESPAGE_SERVICES_QUERY}
            deleteMutation={DELETESERVICE_MUTATION}
            createDisabled={isPublicAccess}
            editDisabled={isPublicAccess}
            deleteDisabled={isPublicAccess}
            resourceName={props.resourceName}
            input={{
              filter: JSON.stringify({
                schedule: {
                  ...(isPublicAccess &&
                    currentUser &&
                    currentUser.id && {
                      customer: {
                        user_id: {
                          equals: currentUser.id,
                        },
                      },
                    }),
                  status: {
                    in: ['approved', 'on progress', 'complete'],
                  },
                },
              }),
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ServicesPage
