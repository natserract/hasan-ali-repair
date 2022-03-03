import React, { useEffect, useState } from 'react'
import { MetaTags, useQuery } from '@redwoodjs/web'
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
import { USERSPAGE_USERS_QUERY } from './query'
import { parseDate } from 'src/utils/date'
import LoadingComponent from 'src/components/loading'

const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'simple',
  enableNestedDataAccess: '.',
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

const UsersPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { data: usersQueryData } = useQuery(USERSPAGE_USERS_QUERY)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [usersData, setUsersData] = useState([])

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
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, _updateValue) => {
          const rowIdx = tableMeta.rowIndex
          const dataIdx = tableMeta.tableData[rowIdx].id

          return (
            <Grid container className={classes.actionButtonContainer}>
              <Tooltip title="View">
                <IconButton
                  color="primary"
                  onClick={() => handleNavigate(`/app/user/view/${dataIdx}`)}
                >
                  <VisibilityOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={() => handleNavigate(`/app/user/edit/${dataIdx}`)}
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

  const fetchUser = () => {
    if (usersQueryData) {
      const { users } = usersQueryData
      setUsersData(users)
    }
  }

  useEffect(fetchUser, [usersQueryData])

  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <Grid container spacing={4}>
        <Grid item xs={12}>
          {usersData.length ? (
            <DataTable
              title="Users"
              data={usersData}
              columns={columns}
              options={options}
            />
          ) : (
            <LoadingComponent />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default UsersPage
