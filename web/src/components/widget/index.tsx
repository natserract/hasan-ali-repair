import React, { useState } from 'react'
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core'
import {
  MoreVert as MoreIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons'
import classnames from 'classnames'

// styles
import useStyles from './styles'
import { useNavigate } from 'src/libs/gql-router'

type WidgetProps = {
  title: string
  noBodyPadding: boolean
  bodyClass: string
  disableWidgetMenu: boolean
  header: React.ReactNode
  noHeaderPadding: boolean
  headerClass: string
  style: React.CSSProperties
  noWidgetShadow: boolean
  children: React.ReactNode
}

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Partial<WidgetProps>) {
  const classes = useStyles()

  const navigate = useNavigate()

  // local
  const [moreButtonRef, setMoreButtonRef] = useState(null)
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false)

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper
        className={classes.paper}
        classes={{
          root: classnames(classes.widgetRoot, {
            [classes.noWidgetShadow]: noWidgetShadow,
          }),
        }}
      >
        <div
          className={classnames(classes.widgetHeader, {
            [classes.noPadding]: noHeaderPadding,
            [headerClass]: headerClass,
          })}
        >
          {header ? (
            header
          ) : (
            <React.Fragment>
              <div className={classes.headerTitle}>
                <IconButton onClick={() => navigate.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" noWrap>
                  {title}
                </Typography>
              </div>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem>
      </Menu>
    </div>
  )
}
