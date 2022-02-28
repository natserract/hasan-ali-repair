import React from 'react'
import { MetaTags } from '@redwoodjs/web'
import DataTable from 'mui-datatables'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import Button from 'src/components/button'
import useStyles from './styles'
import { useNavigate } from 'src/libs/gql-router/hooks'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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

const options = {
  filter: true,
  filterType: 'dropdown',
  customToolbar: () => (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={() => useNavigate().push('/app/user/create')}
        disableElevation
      >
        Create
      </Button>
    </React.Fragment>
  ),
}

const UsersPage = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (route: string) => {
    navigate.push(route)
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
              <Tooltip title="View">
                <IconButton
                  color="primary"
                  onClick={() => handleNavigate(`/app/user/view/${idx}`)}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={() => handleNavigate(`/app/user/edit/${idx}`)}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="secondary"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Menu
                id="delete-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    Are you sure want to delete?
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => console.log('YES')}
                        disableElevation
                        style={{ marginRight: 7 }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={handleClose}
                        disableElevation
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </MenuItem>
              </Menu>
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
