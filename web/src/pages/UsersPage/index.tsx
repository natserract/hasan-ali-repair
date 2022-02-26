import React, { useEffect } from 'react'
import { MetaTags } from '@redwoodjs/web'
import DataTable from 'mui-datatables'
import { Grid } from '@material-ui/core'
import Button from 'src/components/button'

const datatableData = [
  ['Joe James', 'Example Inc.', 'Yonkers', 'NY'],
  ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
  ['Bob Herm', 'Example Inc.', 'Tampa', 'FL'],
  ['James Houston', 'Example Inc.', 'Dallas', 'TX'],
  ['Prabhakar Linwood', 'Example Inc.', 'Hartford', 'CT'],
  ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
  ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
  ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
  ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
  ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
  ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
  ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
  ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
  ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
  ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
  ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
  ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
]

// styles
import useStyles from './styles'
import { browserHistory } from 'src/utils/history'

const options = {
  filter: true,
  filterType: 'dropdown',
  customToolbar: () => (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={() => browserHistory.push('/app/user/create')}
        disableElevation
      >
        Create
      </Button>
    </React.Fragment>
  ),
}

const UsersPage = (props) => {
  const classes = useStyles()

  const handleNavigate = (route: string) => {
    browserHistory.push(route)
  }

  const columns = [
    {
      name: 'Name',
      options: {
        filter: false,
      },
    },
    {
      name: 'Company',
      options: {
        filter: true,
      },
    },
    {
      name: 'City',
      options: {
        filter: false,
      },
    },
    {
      name: 'State',
      options: {
        filter: true,
      },
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const idx = tableMeta.rowIndex

          return (
            <Grid container className={classes.actionButtonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate(`/app/user/view/${idx}`)}
              >
                View
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleNavigate('/app/user/edit')}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => console.log('deleted!')}
              >
                Delete
              </Button>
            </Grid>
          )
        },
      },
    },
  ]

  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DataTable
            title="Users"
            data={datatableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default UsersPage
