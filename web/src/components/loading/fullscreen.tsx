import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles(styles as any)

const FullscreenLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CircularProgress disableShrink size={30} className={classes.loading} />
    </div>
  )
}

export default FullscreenLoading
