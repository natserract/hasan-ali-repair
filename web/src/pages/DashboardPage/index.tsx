/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
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
import { MetaTags, useQuery } from '@redwoodjs/web'
import { ArrowRightAlt as ArrowRightAltIcon } from '@material-ui/icons'
import { DASHBOARDREPORTS_QUERY } from './query'
import { dates } from 'src/constant/data'

const DashboardPage = () => {
  const _classes = useStyles()
  const theme = useTheme() as typeof Theme

  const { data: reportsData } = useQuery(DASHBOARDREPORTS_QUERY)
  const reports = reportsData?.dashboardReports

  const [lineChartData, setLineChartData] = useState([])

  useEffect(() => {
    const servicesDaily = reports?.serviceDaily

    if (servicesDaily) {
      const objs = dates().map((day) => {
        const activeDay = servicesDaily.find((v) => +v.day == day)

        return {
          day,
          price: activeDay?.price || 0,
          count: activeDay?.count || 0,
        }
      })
      setLineChartData(objs)
      console.log('objs', objs)
    }
  }, [reports])

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
                {reports?.totalPendingBookings || 0}
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
                {reports?.totalPartsIn || 0}
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
                {reports?.totalNewRegisteredUsers || 0}
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
                {reports?.totalServicesToday || 0}
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
                  <XAxis dataKey="day" />
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
