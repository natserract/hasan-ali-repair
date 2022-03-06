import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Grid, IconButton, Tooltip } from '@material-ui/core'
import Widget from 'src/components/widget'
import DataTable from 'mui-datatables'
import useStyles from './styles'
import { useNavigate } from 'src/libs/gql-router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { DocumentNode } from '@apollo/client'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Button from 'src/components/button'
import { toast } from '@redwoodjs/web/toast'
import { extractError } from 'src/utils/errors'
import { toCamelCase } from 'src/utils/string'
import pluralize from 'pluralize'

type OptionalProps = {
  title: string
}

type ListProps = {
  resourceName: string
  listQuery: DocumentNode
  deleteMutation: DocumentNode
  columns: {
    name: string
    label: string
    options: {
      filter?: boolean
      customBodyRender?: (tableMeta) => any
      sort?: boolean
    }
  }[]
} & Partial<OptionalProps>

const List: React.FC<ListProps> = ({
  title,
  resourceName,
  listQuery,
  deleteMutation,
  columns,
}) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const resourceTitle = toCamelCase(resourceName)
  const resourcePluralize = pluralize(resourceName, 1)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [data, setData] = useState([])

  const deleteItemRef = useRef(NaN)
  const deleteRowsRef = useRef([])
  const [loadingData, setLoadingData] = useState(false)

  const { data: queryData } = useQuery(listQuery)
  const [deleteFunc] = useMutation(deleteMutation, {
    refetchQueries: [listQuery],
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

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteFunc({
          variables: {
            id,
          },
        })
      } catch (error) {
        return error
      }
    },
    [deleteFunc]
  )

  const handleDelete = useCallback(async () => {
    const id = deleteItemRef.current
    setLoadingData(true)

    onDelete(id)
      .then(() => {
        toast.success(`${toCamelCase(resourcePluralize)} successfully deleted`)
      })
      .catch((error) => toast.error(extractError(error).message))
      .finally(() => {
        setLoadingData(false)
      })
  }, [onDelete, resourcePluralize])

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
            onClick={() => navigate.push(`/app/${resourcePluralize}/create`)}
            disableElevation
          >
            Create
          </Button>
        </React.Fragment>
      ),
      onRowSelectionChange: (currentRowsSelected) => {
        currentRowsSelected.map(({ dataIndex }) => {
          const id = data[dataIndex].id
          const isHas =
            deleteRowsRef.current.length > 0 &&
            deleteRowsRef.current.includes(id)

          if (!isHas) {
            deleteRowsRef.current.push(data[dataIndex].id)
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
          toast.success(`${resourceTitle} successfully deleted`)
        } catch (error) {
          toast.error(extractError(error).message)
        }
      },
    }),
    [navigate, resourcePluralize, data, resourceTitle, onDelete]
  )

  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        name: 'Action',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, _updateValue) => {
            const rowIdx = tableMeta.rowIndex
            const dataIdx =
              tableMeta.tableData[rowIdx].id || tableMeta.tableData[rowIdx][0]

            return (
              <Grid container className={classes.actionButtonContainer}>
                <Tooltip title="View">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate.push(`/app/${resourcePluralize}/view/${dataIdx}`)
                    }
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate.push(`/app/${resourcePluralize}/edit/${dataIdx}`)
                    }
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
      columns,
      handleDelete,
      navigate,
      resourcePluralize,
    ]
  )

  const fetchData = () => {
    if (queryData) {
      const data = queryData[resourceName]
      setData(data)
    }
  }

  useEffect(fetchData, [queryData, resourceName])

  return (
    <Widget
      isLoading={!data.length || loadingData}
      header={<React.Fragment />}
      noBodyPadding
      noHeaderPadding
    >
      <DataTable
        title={title ?? resourceTitle}
        data={data}
        columns={tableColumns}
        options={options}
      />
    </Widget>
  )
}

export default List
