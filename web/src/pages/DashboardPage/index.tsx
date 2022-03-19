/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { MetaTags } from '@redwoodjs/web'
import Content from './content'
import useStyles from './styles'
import Notification from 'src/components/notification'
import Grid from '@material-ui/core/Grid'

const DashboardPage = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <MetaTags title="Dashboard" description="Dashboard page" />

      {/* <Grid container>
        <Grid item xs={12}>
          <Notification
            type="message"
            message="Welcome Back to Bengkel Hasan Ali Repair!"
            variant="contained"
            className={classes.notification}
          />
        </Grid>
      </Grid> */}

      <Content />
    </React.Fragment>
  )
}

export default DashboardPage
