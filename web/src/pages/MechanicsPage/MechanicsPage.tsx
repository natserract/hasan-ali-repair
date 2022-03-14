import { MetaTags } from '@redwoodjs/web'
import { MECHANICS_QUERY } from './query'
import { DELETEMECHANIC_MUTATION } from './mutation'
import React, { useMemo } from 'react'
import List from 'src/components/common/list'
import { Grid } from '@material-ui/core'
import Button from 'src/components/button'

const MechanicsPage = (props) => {
  const columns = useMemo(
    () => [
      {
        name: 'id',
        label: 'Mechanic Id',
        options: {
          display: false,
          filter: false,
        },
      },
      {
        name: 'name',
        label: 'Mechanic Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'person_id',
        label: 'Person ID',
        options: {
          filter: false,
        },
      },
      {
        name: 'is_active',
        label: 'Status',
        options: {
          filter: true,
          filterType: 'checkbox',
          filterOptions: {
            renderValue: (v) => (v ? 'Active' : 'Inactive'),
          },
          customBodyRender: (status) => {
            return status ? (
              <Button size="small" color="primary" variant="outlined">
                Active
              </Button>
            ) : (
              <Button size="small" color="secondary" variant="outlined">
                Inactive
              </Button>
            )
          },
        },
      },
      {
        name: 'address',
        label: 'Address',
        options: {
          filter: false,
        },
      },
    ],
    []
  )

  return (
    <>
      <MetaTags title="Mechanics" description="Mechanics page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columns={columns}
            listQuery={MECHANICS_QUERY}
            deleteMutation={DELETEMECHANIC_MUTATION}
            resourceName={props.resourceName}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default MechanicsPage
