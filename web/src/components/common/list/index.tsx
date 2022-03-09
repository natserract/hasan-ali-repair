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
import orderBy from 'lodash.orderby'

type ActionDisabled = {
  createDisabled: boolean
  showDisabled: boolean | ((data) => boolean)
  editDisabled: boolean | ((data) => boolean)
  deleteDisabled: boolean | ((data) => boolean)
}

type OptionalProps = {
  title: string
  input: Record<string, any>
  isLoading: boolean
  refetchOnMount: boolean
  onFetch: (data: any) => void

  // Check: https://www.npmjs.com/package/mui-datatables
  options?: Record<string, any>

  orderBy?: {
    key: string
    sort: 'asc' | 'desc'
  }
} & Partial<ActionDisabled>

type ListProps = {
  resourceName: string
  listQuery: DocumentNode
  deleteMutation: DocumentNode
  columns: {
    name: string
    label: string
    options: {
      filter?: boolean
      customBodyRender?: (tableMeta: any, tableData: any) => any
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
  input,
  isLoading,
  onFetch,
  refetchOnMount,
  createDisabled,
  showDisabled,
  editDisabled,
  deleteDisabled,
  options: optionsProps,
  orderBy: orderByProps,
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

  const {
    data: queryData,
    loading: queryLoading,
    refetch,
  } = useQuery(listQuery, {
    variables: {
      input: {
        ...input,
      },
    },
  })
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
      ...optionsProps,
      filter: true,
      filterType: 'dropdown',
      responsive: 'simple',
      enableNestedDataAccess: '.',
      customToolbar: () => (
        <React.Fragment>
          {createDisabled ? (
            <React.Fragment />
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate.push(`/app/${resourcePluralize}/create`)}
              disableElevation
            >
              Create
            </Button>
          )}
        </React.Fragment>
      ),
      onRowSelectionChange: (currentRowsSelected: { dataIndex: any }[]) => {
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
    [
      createDisabled,
      optionsProps,
      navigate,
      resourcePluralize,
      data,
      resourceTitle,
      onDelete,
    ]
  )

  const tableColumns = useMemo(
    () => [
      ...columns,
      {
        name: 'Action',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (
            value: any,
            tableMeta: { rowIndex: any; tableData: any },
            _updateValue: any
          ) => {
            const rowIdx = tableMeta.rowIndex
            const dataIdx =
              tableMeta.tableData[rowIdx].id || tableMeta.tableData[rowIdx][0]

            return (
              <Grid container className={classes.actionButtonContainer}>
                <Tooltip
                  disableHoverListener={
                    typeof showDisabled == 'function'
                      ? showDisabled(tableMeta)
                      : (showDisabled as boolean)
                  }
                  title="View"
                >
                  {/*
                    We need span wrapper, because:
                    `Material UI: You are providing a disabled `button` child to the
                    Tooltip component.`
                  */}
                  <span>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate.push(
                          `/app/${resourcePluralize}/view/${dataIdx}`
                        )
                      }
                      disabled={
                        typeof showDisabled == 'function'
                          ? showDisabled(tableMeta)
                          : (showDisabled as boolean)
                      }
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip
                  disableHoverListener={
                    typeof editDisabled == 'function'
                      ? editDisabled(tableMeta)
                      : (editDisabled as boolean)
                  }
                  title="Edit"
                >
                  <span>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate.push(
                          `/app/${resourcePluralize}/edit/${dataIdx}`
                        )
                      }
                      disabled={
                        typeof editDisabled == 'function'
                          ? editDisabled(tableMeta)
                          : (editDisabled as boolean)
                      }
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>

                {!(typeof deleteDisabled == 'function'
                  ? deleteDisabled(tableMeta)
                  : (deleteDisabled as boolean)) && (
                  <>
                    <Tooltip
                      disableHoverListener={
                        typeof deleteDisabled == 'function'
                          ? deleteDisabled(tableMeta)
                          : (deleteDisabled as boolean)
                      }
                      title="Delete"
                    >
                      <IconButton
                        color="secondary"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, dataIdx)}
                        disabled={
                          typeof deleteDisabled == 'function'
                            ? deleteDisabled(tableMeta)
                            : (deleteDisabled as boolean)
                        }
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
                  </>
                )}
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
      deleteDisabled,
      editDisabled,
      handleDelete,
      navigate,
      resourcePluralize,
      showDisabled,
    ]
  )

  const fetchData = () => {
    if (queryData) {
      const data = queryData[resourceName]

      if (orderByProps) {
        const sortedData = orderBy(data, orderByProps.key, orderByProps.sort)
        setData(sortedData)
      } else {
        setData(data)
      }

      // Passing data to props
      if (onFetch && typeof onFetch === 'function') {
        onFetch(data)
      }
    }
  }

  useEffect(fetchData, [onFetch, queryData, resourceName, orderByProps])

  useEffect(() => {
    if (refetchOnMount) {
      refetch()
    }
  }, [refetch, refetchOnMount])

  return (
    <Widget
      isLoading={isLoading || queryLoading || loadingData}
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
