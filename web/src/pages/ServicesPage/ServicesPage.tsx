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
        name: 'customer.user.name',
        label: 'Customer Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'vehicle.name',
        label: 'Vehicle Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          sort: false,
          customBodyRender: (tableMeta) => {
            return toCamelCase(tableMeta)
          },
        },
      },
      {
        name: 'created_at',
        label: 'Service At',
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
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ServicesPage
