import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { SHOWMECHANIC_QUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'

const ShowMechanicPage = () => {
  const params = useParams()

  const { data: mechanicData, loading: loadingMechanicData } = useQuery(
    SHOWMECHANIC_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const mechanic = mechanicData?.mechanic

  return (
    <>
      <MetaTags title="Show Mechanic" description="Show Mechanic page" />

      <Widget
        isLoading={loadingMechanicData}
        title="View Mechanic"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Name
            </Typography>
            <InputLabel color="secondary">{mechanic?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Person Id
            </Typography>
            <InputLabel color="secondary">{mechanic?.person_id}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Status
            </Typography>
            <InputLabel color="secondary">
              {mechanic?.is_active ? 'Active' : 'Inactive'}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Address
            </Typography>
            <InputLabel color="secondary">{mechanic?.address}</InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowMechanicPage
