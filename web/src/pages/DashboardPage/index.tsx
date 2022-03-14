import React from 'react'
import Theme from 'src/themes'
import useStyles from './styles'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import useTheme from '@material-ui/styles/useTheme'
import { Grid, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Widget from 'src/components/widget'
import { MetaTags } from '@redwoodjs/web'
import { ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons'

const lineChartData = [
  {
    month: 'Page A',
    price: 4000,
    count: 2400,
  },
  {
    month: 'Page B',
    price: 3000,
    count: 1398,
  },
  {
    month: 'Page C',
    price: 2000,
    count: 9800,
  },
  {
    month: 'Page D',
  },
]

const DashboardPage = () => {
  const _classes = useStyles()
  const theme = useTheme() as typeof Theme

  return (
    <React.Fragment>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Pending Bookings
                <Typography
                  component="i"
                  variant="subtitle2"
                  color="textSecondary"
                  style={{
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  (All's)
                </Typography>
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
                style={{ marginTop: 10 }}
              >
                5
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                endIcon={<ArrowRightAltIcon />}
              >
                See Bookings
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Parts In
                <Typography
                  component="i"
                  variant="subtitle2"
                  color="textSecondary"
                  style={{
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  (Weekly)
                </Typography>
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
                style={{ marginTop: 10 }}
              >
                8
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                endIcon={<ArrowRightAltIcon />}
              >
                See Parts
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Registered Users
                <Typography
                  component="i"
                  variant="subtitle2"
                  color="textSecondary"
                  style={{
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  (Weekly)
                </Typography>
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
                style={{ marginTop: 10 }}
              >
                10
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                endIcon={<ArrowRightAltIcon />}
              >
                See Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Services
                <Typography
                  component="i"
                  variant="subtitle2"
                  color="textSecondary"
                  style={{
                    fontSize: 13,
                    paddingLeft: 5,
                  }}
                >
                  (Today)
                </Typography>
              </Typography>
              <Typography
                variant="h1"
                color="textPrimary"
                style={{ marginTop: 10 }}
              >
                15
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                endIcon={<ArrowRightAltIcon />}
              >
                See Services
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h3"
                color="textPrimary"
                style={{
                  padding: 15,
                  marginBottom: 15,
                }}
                gutterBottom
              >
                30 Days Orders History
              </Typography>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  width={500}
                  height={300}
                  data={lineChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={theme.palette.secondary.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid style={{ marginTop: 15 }} item xs={12} md={8}> */}
        {/* <Widget
          title="Based on Months"
          noBodyPadding
          disablePrevButton
          disableWidgetMenu
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              width={500}
              height={300}
              data={lineChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke={theme.palette.primary.main}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke={theme.palette.secondary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </Widget> */}
        {/* </Grid> */}
      </Grid>
    </React.Fragment>
  )
}

export default DashboardPage
