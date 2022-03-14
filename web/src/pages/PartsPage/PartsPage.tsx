import List from 'src/components/common/list'
import { MetaTags } from '@redwoodjs/web'
import { Grid } from '@material-ui/core'
import { PARTSPAGE_PARTS_QUERY } from './query'
import { useMemo } from 'react'
import { PARTS_DELETEPARTMUTATION } from './mutation'

const PartsPage = (props) => {
  const columns = useMemo(
    () => [
      {
        name: 'name',
        label: 'Part Name',
        options: {
          filter: false,
        },
      },
      {
        name: 'part_number',
        label: 'Part Number',
        options: {
          filter: false,
        },
      },
      {
        name: 'qty',
        label: 'Qty',
        options: {
          filter: false,
        },
      },
    ],
    []
  )

  return (
    <>
      <MetaTags title="Parts" description="Parts page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <List
            columns={columns}
            listQuery={PARTSPAGE_PARTS_QUERY}
            deleteMutation={PARTS_DELETEPARTMUTATION}
            resourceName={props.resourceName}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default PartsPage
