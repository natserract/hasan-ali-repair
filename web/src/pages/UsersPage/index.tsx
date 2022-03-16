import React, { useMemo } from 'react'
import { MetaTags } from '@redwoodjs/web'
import useStyles from './styles'
import { USERSPAGE_USERS_QUERY } from './query'
import { parseDate } from 'src/utils/date'
import { USERSPAGE_DELETEUSERMUTATION } from './mutation'
import List from 'src/components/common/list'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const UsersPage = (props) => {
  const _classes = useStyles()

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
        name: 'name',
        label: 'Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
        },
      },
      {
        name: 'user_type',
        label: 'Role',
        options: {
          filter: true,
          customBodyRender: (role) => (
            <Button
              variant="text"
              color={`${role == 'customer' ? 'primary' : 'secondary'}`}
              size="small"
            >
              {role}
            </Button>
          ),
        },
      },
      {
        name: 'created_at',
        label: 'Register At',
        options: {
          filter: false,
          customBodyRender: (tableMeta) => {
            const date = new Date(tableMeta)
            return parseDate(date)
          },
        },
      },
    ],
    []
  )

  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columns={columns}
            listQuery={USERSPAGE_USERS_QUERY}
            deleteMutation={USERSPAGE_DELETEUSERMUTATION}
            resourceName={props.resourceName}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default UsersPage
