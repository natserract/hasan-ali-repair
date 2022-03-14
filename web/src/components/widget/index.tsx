import React, { useRef, useState } from 'react'
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
  PrintSharp as PrintSharpIcon,
} from '@material-ui/icons'
import classnames from 'classnames'
import { useReactToPrint } from 'react-to-print'

// styles
import useStyles from './styles'
import { useLocation, useNavigate } from 'src/libs/gql-router'

type WidgetProps = {
  title: string
  noBodyPadding: boolean
  bodyClass: string
  disableWidgetMenu: boolean
  disablePrevButton: boolean
  header: React.ReactNode
  noHeaderPadding: boolean
  headerClass: string
  style: React.CSSProperties
  noWidgetShadow: boolean
  children: React.ReactNode
  isLoading: boolean
}

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  disablePrevButton,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  isLoading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: Partial<WidgetProps>) {
  const classes = useStyles()

  const navigate = useNavigate()
  const location = useLocation()

  const componentRef = useRef()
  const moreButtonRef = useRef(null)

  const isViewPage = location.pathname.includes('view')
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <div
      className={`${classes.widgetWrapper} ${
        isLoading ? classes.widgetWrapperLoading : ''
      }`}
      style={style && { ...style }}
    >
      <Paper
        ref={componentRef}
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
                {!disablePrevButton && (
                  <IconButton onClick={() => navigate.goBack()}>
                    <ArrowBackIcon />
                  </IconButton>
                )}
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
                  onClick={(e) => setMoreMenuOpen(e.currentTarget)}
                  ref={moreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}

              {isViewPage && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.printButton }}
                  aria-owns="print-menu"
                  onClick={handlePrint}
                >
                  <PrintSharpIcon />
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
        open={Boolean(isMoreMenuOpen)}
        anchorEl={isMoreMenuOpen}
        onClose={() => setMoreMenuOpen(null)}
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
