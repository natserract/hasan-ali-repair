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
import FullScreenLoading from 'src/components/loading/fullscreen'

type CreateProps = {
  resourceName: string
  form: UseFormReturn<any, any>
  createMutation: DocumentNode
  input: (data) => Record<string, any>
  title?: string
  isLoading?: boolean
}

const Create: React.FC<CreateProps> = ({
  resourceName,
  form,
  createMutation,
  input,
  title,
  children,
  isLoading,
}) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { handleSubmit } = form

  const resourceTitle = toCamelCase(resourceName)
  const resourcePluralize = pluralize(resourceName)

  const [loadingCreateData, setLoadingCreateData] = useState(false)
  const [mutateCreateDataFunc] = useMutation(createMutation)

  const onSubmit = async (data) => {
    console.log('submitted form', data)
    setLoadingCreateData(true)

    try {
      await mutateCreateDataFunc({
        variables: {
          input: {
            ...input(data),
          },
        },
      })

      toastPromise(`${resourceTitle} succesfully Added!`, 'success').finally(
        () => {
          setLoadingCreateData(false)
          navigate.push(`/app/${resourcePluralize}`)
        }
      )
    } catch (error) {
      toast.error(extractError(error).message)
      setLoadingCreateData(false)
    }
  }

  const loading = isLoading || loadingCreateData

  return (
    <>
      {loading && <FullScreenLoading />}

      <Widget
        isLoading={loading}
        title={title ?? `Create ${resourceTitle}`}
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
    </>
  )
}

export default Create
