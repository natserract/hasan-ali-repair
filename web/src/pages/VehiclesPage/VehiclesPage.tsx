import List from 'src/components/common/list'
import { MetaTags } from '@redwoodjs/web'
import { Grid } from '@material-ui/core'
import { VEHICLESPAGE_VEHICLES_QUERY } from './query'
import { VEHICLESPAGE_DELETEVEHICLEMUTATION } from './mutation'
import { useMemo } from 'react'
import { useAccess } from 'src/libs/gql-router'
import { useAuthState } from 'src/libs/auth/hooks'

const VehiclesPage = (props) => {
  const { currentRole } = useAccess()
  const isPublicAccess = currentRole === 'customer'

  const { currentUser } = useAuthState()

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
        label: 'Vehicle Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'serialNum',
        label: 'Vehicle Serial Number',
        options: {
          filter: false,
        },
      },
      {
        name: 'year',
        label: 'Year',
        options: {
          filter: true,
        },
      },
    ],
    []
  )

  return (
    <>
      <MetaTags title="Vehicles" description="Vehicles page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columns={columns}
            listQuery={VEHICLESPAGE_VEHICLES_QUERY}
            deleteMutation={VEHICLESPAGE_DELETEVEHICLEMUTATION}
            resourceName={props.resourceName}
            input={{
              filter: JSON.stringify({
                ...(isPublicAccess &&
                  currentUser &&
                  currentUser.id && {
                    user_id: {
                      equals: currentUser.id,
                    },
                  }),
              }),
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default VehiclesPage
