/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ClearAll as ClearAllIcon,
} from '@material-ui/icons'
import classNames from 'classnames'
import useStyles from './styles'

import { Badge, Typography } from 'src/layouts/wrappers'
import Notification from 'src/components/notification'
import UserAvatar from 'src/components/user-avatar'
import { useAuth } from '@redwoodjs/auth'
import { HEADER_CURRENTUSER_QUERY } from './query'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from 'src/store/layout'
import { APP } from 'src/constant/app'
import { useAuthState } from 'src/libs/auth/hooks'
import { useNavigate } from 'src/libs/gql-router'
import { Link } from 'react-router-dom'
import { useQuery } from '@redwoodjs/web'
import { CurrentUser } from 'src/types/share'

const messages = [
  {
    id: 0,
    variant: 'warning',
    name: 'Jane Hew',
    message: 'Hey! How is it going?',
    time: '9:32',
  },
  {
    id: 1,
    variant: 'success',
    name: 'Lloyd Brown',
    message: 'Check out my new Dashboard',
    time: '9:18',
  },
  {
    id: 2,
    variant: 'primary',
    name: 'Mark Winstein',
    message: 'I want rearrange the appointment',
    time: '9:15',
  },
  {
    id: 3,
    variant: 'secondary',
    name: 'Liana Dutti',
    message: 'Good news from sale department',
    time: '9:09',
  },
]

const notifications = [
  { id: 0, color: 'warning', message: 'Check out this awesome ticket' },
  {
    id: 1,
    color: 'success',
    type: 'info',
    message: 'What is the best way to get ...',
  },
  {
    id: 2,
    color: 'secondary',
    type: 'notification',
    message: 'This is just a simple notification',
  },
  {
    id: 3,
    color: 'primary',
    type: 'e-commerce',
    message: '12 new orders has arrived today',
  },
]

const Header = () => {
  const classes = useStyles()

  const { logOut } = useAuth()
  const navigate = useNavigate()
  const { currentUser } = useAuthState()
  const layoutState = useLayoutState()
  const layoutDispatch = useLayoutDispatch()

  const { data: currentUserData } = useQuery(HEADER_CURRENTUSER_QUERY, {
    variables: {
      email: currentUser?.email ?? '',
    },
  })
  const user = currentUserData?.currentUser as CurrentUser

  const [mailMenu, setMailMenu] = useState(null)
  const [isMailsUnread, setIsMailsUnread] = useState(true)
  const [notificationsMenu, setNotificationsMenu] = useState(null)
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true)
  const [profileMenu, setProfileMenu] = useState(null)
  const [isSearchOpen, setSearchOpen] = useState(true)

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ClearAllIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          )}
        </IconButton>

        <Typography variant="h4" weight="medium" className={classes.logotype}>
          <Link to="/">{APP.name}</Link>
        </Typography>
        <div className={classes.grow} />

        {/* <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search???"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}
        {/* <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget)
            setIsNotificationsUnread(false)
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setMailMenu(e.currentTarget)
            setIsMailsUnread(false)
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
          <Typography variant="body2">
            Hi, <b>{user?.name}</b>
          </Typography>
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map((message) => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {user?.name}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="span"
              color="textSecondary"
            >
              {user?.email}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem
            )}
            onClick={() => {
              navigate.push('/app/profile')
              setProfileMenu(null)
            }}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => logOut()}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
