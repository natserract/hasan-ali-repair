import React, { useMemo } from 'react'
import { MetaTags } from '@redwoodjs/web'
import {
  Form,
  Label,
  EmailField,
  PasswordField,
  Submit,
  FieldError,
  DateField,
} from '@redwoodjs/forms'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import { SCHEDULES_QUERY } from './query'
import { parseDate } from 'src/utils/date'
import { DELETESCHEDULE_MUTATION } from './mutation'

const SchedulesPage = (props) => {
  const columns = useMemo(
    () => [
      {
        name: 'service.customer.user.name',
        label: 'Customer Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'time_from',
        label: 'Start Date',
        options: {
          filter: false,
          customBodyRender: (data) => {
            return parseDate(new Date(data))
          },
        },
      },
      {
        name: 'time_to',
        label: 'Out Date',
        options: {
          filter: false,
          customBodyRender: (data) => {
            return parseDate(new Date(data))
          },
        },
      },
      {
        name: 'service.status',
        label: 'Status',
        options: {
          filter: true,
        },
      },
      // {
      //   name: 'email',
      //   label: 'Email',
      //   options: {
      //     filter: false,
      //   },
      // },
      // {
      //   name: 'user_type',
      //   label: 'Role',
      //   options: {
      //     filter: true,
      //   },
      // },
      // {
      //   name: 'created_at',
      //   label: 'Register At',
      //   options: {
      //     filter: false,
      //     customBodyRender: (tableMeta) => {
      //       const date = new Date(tableMeta)
      //       return parseDate(date)
      //     },
      //   },
      // },
    ],
    []
  )

  return (
    <>
      <MetaTags title="Bookings" description="Bookings page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            title="Bookings"
            columns={columns}
            listQuery={SCHEDULES_QUERY}
            deleteMutation={DELETESCHEDULE_MUTATION}
            resourceName={props.resourceName}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default SchedulesPage
