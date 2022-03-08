import React, { useState } from 'react'
import { DocumentNode } from '@apollo/client'
import useStyles from './styles'
import { useNavigate } from 'src/libs/gql-router'
import { UseFormReturn } from 'react-hook-form'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { toCamelCase } from 'src/utils/string'
import Button from 'src/components/button'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import Widget from 'src/components/widget'
import { extractError } from 'src/utils/errors'
import { toastPromise } from 'src/utils/info'
import pluralize from 'pluralize'
import { useAuth } from '@redwoodjs/auth'

type EditProps = {
  resourceName: string
  form: UseFormReturn<any, any>
  showQuery: DocumentNode
  editMutation: DocumentNode
  input: (data) => Record<string, any>
  id: number
  title?: string
  isLoading?: boolean
  isCurrentUserUpdated?: boolean
}

const Edit: React.FC<EditProps> = ({
  resourceName,
  form,
  showQuery,
  editMutation,
  isLoading,
  input,
  id,
  title,
  isCurrentUserUpdated,
  children,
}) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { logOut } = useAuth()

  const { handleSubmit } = form

  const _resourceTitle = toCamelCase(resourceName)
  const resourcePluralize = pluralize(resourceName)

  const [mutateEditFunc] = useMutation(editMutation, {
    refetchQueries: [showQuery],
  })

  const [loadingEditData, setLoadingEditData] = useState(false)

  const onSubmit = async (data) => {
    console.log('submitted form', data)
    setLoadingEditData(true)

    try {
      await mutateEditFunc({
        variables: {
          id,
          input: {
            ...input(data),
          },
        },
      })

      if (!isCurrentUserUpdated) {
        toastPromise(
          `${toCamelCase(resourceName)} succesfully Updated!`,
          'success'
        ).finally(() => {
          setLoadingEditData(false)

          navigate.push(`/app/${resourcePluralize}`)
        })
      } else {
        // If current user has update,
        // We need to logout
        logOut()
      }
    } catch (error) {
      toast.error(extractError(error).message)
      setLoadingEditData(false)
    }
  }

  return (
    <Widget
      isLoading={isLoading || loadingEditData}
      title={title ?? `Edit ${toCamelCase(resourceName)}`}
      disableWidgetMenu
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formRoot}>
        {children}

        <div className={classes.formActions}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveOutlinedIcon />}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Widget>
  )
}

export default Edit
