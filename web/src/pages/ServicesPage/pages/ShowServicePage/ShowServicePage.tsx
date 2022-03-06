import { MetaTags, useQuery } from '@redwoodjs/web'
import Widget from 'src/components/widget'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import { SHOWSERVICE_QUERY } from './query'
import { useParams } from 'src/libs/gql-router/hooks'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DoneIcon from '@material-ui/icons/Done'
import { parseDate } from 'src/utils/date'

const ShowServicePage = () => {
  const params = useParams()

  const { data: serviceQueryData, loading: loadingServiceQuery } = useQuery(
    SHOWSERVICE_QUERY,
    {
      variables: {
        id: +params?.id,
      },
    }
  )
  const service = serviceQueryData?.service

  return (
    <>
      <MetaTags title="ShowService" description="ShowService page" />

      <Widget
        isLoading={loadingServiceQuery}
        title="View Service"
        disableWidgetMenu
      >
        <div className="formGroup">
          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Customer Name
            </Typography>
            <InputLabel color="secondary">
              {service?.customer?.user?.name}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Bookings
            </Typography>
            <InputLabel color="secondary">
              <List dense disablePadding>
                {service?.schedule.length
                  ? service?.schedule.map((item) => (
                      <ListItem
                        divider
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        key={item?.id}
                      >
                        <ListItemIcon style={{ minWidth: 30 }}>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Time from`}
                          secondary={`${parseDate(new Date(item?.time_from))}`}
                        />
                        <ListItemText
                          primary={`Time to`}
                          secondary={`${parseDate(new Date(item?.time_to))}`}
                        />
                      </ListItem>
                    ))
                  : 'Not Yet'}
              </List>
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Status
            </Typography>
            <InputLabel color="secondary" style={{ fontWeight: 'bold' }}>
              {service?.status}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Mechanic Name
            </Typography>
            <InputLabel color="secondary">{service?.mechanic?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Mechanic Id
            </Typography>
            <InputLabel color="secondary">
              {service?.mechanic?.person_id}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle
            </Typography>
            <InputLabel color="secondary">{service?.vehicle?.name}</InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Vehicle Serial Num
            </Typography>
            <InputLabel color="secondary">
              {service?.vehicle?.serialNum}
            </InputLabel>
          </div>

          <div className="formGroupItem">
            <Typography variant="h6" component="h4">
              Parts Used
            </Typography>
            <InputLabel color="secondary">
              <List dense disablePadding>
                {service?.partsUsed.length
                  ? service?.partsUsed.map((item) => (
                      <ListItem
                        divider
                        style={{
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        key={item?.id}
                      >
                        <ListItemIcon style={{ minWidth: 30 }}>
                          <DoneIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Part Name`}
                          secondary={item?.parts?.name}
                        />
                        <ListItemText
                          primary={`Part Serial Num`}
                          secondary={item?.parts?.part_number}
                        />
                      </ListItem>
                    ))
                  : 'Not Yet'}
              </List>
            </InputLabel>
          </div>
        </div>
      </Widget>
    </>
  )
}

export default ShowServicePage
