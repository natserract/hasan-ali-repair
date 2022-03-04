import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MetaTags, useMutation, useQuery } from '@redwoodjs/web'
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
import Widget from 'src/components/widget'
import { USERSPAGE_DELETEUSERMUTATION } from './mutation'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'

const UsersPage = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [usersData, setUsersData] = useState([])

  const deleteItemRef = useRef(NaN)
  const deleteRowsRef = useRef([])
  const [loadingData, setLoadingData] = useState(false)

  const { data: usersQueryData } = useQuery(USERSPAGE_USERS_QUERY)
  const [deleteUserFunc] = useMutation(USERSPAGE_DELETEUSERMUTATION, {
    refetchQueries: [USERSPAGE_USERS_QUERY],
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget)
    deleteItemRef.current = id
  }

  const handleClose = () => {
    setAnchorEl(null)
    deleteItemRef.current = NaN
  }

  const handleNavigate = useCallback(
    (route: string) => {
      navigate.push(route)
    },
    [navigate]
  )

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteUserFunc({
          variables: {
            id,
          },
        })
      } catch (error) {
        return error
      }
    },
    [deleteUserFunc]
  )

  const handleDelete = useCallback(async () => {
    const id = deleteItemRef.current
    setLoadingData(true)

    onDelete(id)
      .then(() => {
        toast.success('User successfully deleted')
      })
      .catch((error) => toast.error(extractError(error).message))
      .finally(() => {
        setLoadingData(false)
      })
  }, [onDelete])

  const options = useMemo(
    () => ({
      filter: true,
      filterType: 'dropdown',
      responsive: 'simple',
      enableNestedDataAccess: '.',
      customToolbar: () => (
        <React.Fragment>
          <Button
            variant="outlined"
            onClick={() => navigate.push('/app/user/create')}
            disableElevation
          >
            Create
          </Button>
        </React.Fragment>
      ),
      onRowSelectionChange: (currentRowsSelected) => {
        currentRowsSelected.map(({ dataIndex }) => {
          const id = usersData[dataIndex].id
          const isHas =
            deleteRowsRef.current.length > 0 &&
            deleteRowsRef.current.includes(id)

          if (!isHas) {
            deleteRowsRef.current.push(usersData[dataIndex].id)
          } else {
            const position = deleteRowsRef.current.indexOf(id)
            deleteRowsRef.current = deleteRowsRef.current.filter(
              (_, i) => i !== position
            )
          }
        })
      },
      onRowsDelete: async () => {
        try {
          await Promise.all(
            deleteRowsRef.current.map((item) => {
              onDelete(item)
            })
          )
          toast.success('User successfully deleted')
        } catch (error) {
          toast.error(extractError(error).message)
        }
      },
    }),
    [navigate, onDelete, usersData]
  )

  const columns = useMemo(
    () => [
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
                    onClick={(e) => handleClick(e, dataIdx)}
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
                  <MenuItem
                    className={classes.menuItemRoot}
                    onClick={handleClose}
                  >
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
                          onClick={handleDelete}
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
    ],
    [
      anchorEl,
      classes.actionButtonContainer,
      classes.menuItemRoot,
      handleDelete,
      handleNavigate,
    ]
  )

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
          <Widget
            isLoading={!usersData.length || loadingData}
            header={<React.Fragment />}
            noBodyPadding
            noHeaderPadding
          >
            <DataTable
              title="Users"
              data={usersData}
              columns={columns}
              options={options}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}

export default UsersPage
