import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import useStyles from './styles'
import { SHOWUSERPAGE_USERQUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'
import { CurrentUser } from 'src/types/share'

const ShowUserPage = () => {
  const _classes = useStyles()
  const params = useParams()

  const { data: userQueryData, loading: loadingQueryData } = useQuery(
    SHOWUSERPAGE_USERQUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const user = userQueryData?.user as CurrentUser

  return (
    <>
      <MetaTags title="Show User" description="Show User page" />

      <Widget isLoading={loadingQueryData} title="View User" disableWidgetMenu>
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Name
            </Typography>
            <InputLabel color="secondary">{user?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Email
            </Typography>
            <InputLabel color="secondary">{user?.email}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Role
            </Typography>
            <InputLabel color="secondary">{user?.user_type}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Address
            </Typography>
            <InputLabel color="secondary">{user?.address || '-'}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Phone Number
            </Typography>
            <InputLabel color="secondary">
              {user?.phone_number || '-'}
            </InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowUserPage
