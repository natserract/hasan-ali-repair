import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import useStyles from './styles'
import Button from 'src/components/button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { useAuthState } from 'src/libs/auth/hooks'
import { useNavigate } from 'src/libs/gql-router'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { PROFILEPAGE_CURRENTUSER_QUERY } from './query'
import { CurrentUser } from 'src/types/share'
import { stringToSlug } from 'src/utils/string'

const ProfilePage = () => {
  const classes = useStyles()

  const navigate = useNavigate()
  const { currentUser } = useAuthState()

  const { data: currentUserData } = useQuery(PROFILEPAGE_CURRENTUSER_QUERY, {
    variables: {
      email: currentUser?.email,
    },
  })
  const user = currentUserData?.currentUser as CurrentUser

  return (
    <>
      <MetaTags title="My Profile" description="My Profile page" />

      <Widget
        headerClass={classes.headerWidget}
        title="My Profile"
        disablePrevButton
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Name
            </Typography>
            <InputLabel color="secondary">{user?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Email Address
            </Typography>
            <InputLabel color="secondary">{user?.email}</InputLabel>
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

          <div className={classes.formActions}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditOutlinedIcon />}
              type="submit"
              onClick={() =>
                navigate.push(`/app/profile/edit/${stringToSlug(user.name)}`)
              }
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ProfilePage
