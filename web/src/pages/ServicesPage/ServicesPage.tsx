import { MetaTags } from '@redwoodjs/web'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import { SERVICESPAGE_SERVICES_QUERY } from './query'
import { DELETESERVICE_MUTATION } from './mutation'
import { useMemo } from 'react'
import { toCamelCase } from 'src/utils/string'
import { parseDate } from 'src/utils/date'

const ServicesPage = (props) => {
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
    []
  )

  return (
    <>
      <MetaTags title="Services" description="Services page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columns={columns}
            listQuery={SERVICESPAGE_SERVICES_QUERY}
            deleteMutation={DELETESERVICE_MUTATION}
            resourceName={props.resourceName}
            input={{
              filter: JSON.stringify({
                schedule: {
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
