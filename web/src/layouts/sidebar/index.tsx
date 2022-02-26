import React, { useState, useEffect, useRef } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'
import {
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  List as ListIcon,
} from '@material-ui/icons'
import { useTheme } from '@material-ui/styles'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import Theme from 'src/themes/default'
import { AuthClient } from 'src/libs/auth/client'

import useStyles from './styles'

// components
import SidebarLink from './components/sidebarLink'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from 'src/store/layout'
import { useResource } from 'src/libs/gql-router/contexts/resource'
import { toCamelCase } from 'src/utils/string'
import { adminTypes, clientTypes } from 'src/resources'

type LinkType = {
  id?: number
  label?: string
  link?: string
  type?: string
  icon?: React.ReactNode
}

const defaultLinks = [
  { id: 5, type: 'divider' },
  { id: 6, type: 'title', label: 'HELP' },
  {
    id: 7,
    label: 'Library',
    link: 'https://flatlogic.com/templates',
    icon: <LibraryIcon />,
  },
  {
    id: 8,
    label: 'Support',
    link: 'https://flatlogic.com/forum',
    icon: <SupportIcon />,
  },
  {
    id: 9,
    label: 'FAQ',
    link: 'https://flatlogic.com/forum',
    icon: <FAQIcon />,
  },
]

const Sidebar = () => {
  const classes = useStyles()

  const theme = useTheme() as typeof Theme

  // global
  const { isSidebarOpened } = useLayoutState()
  const layoutDispatch = useLayoutDispatch()
  const { resources } = useResource()

  // local
  const [isPermanent, setPermanent] = useState(true)

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  const dynamicMenuRef = useRef<LinkType[]>([])
  const [dynamicMenu, setDynamicMenu] = useState<LinkType[]>([])

  const handleMenu = () => {
    const onFetch = async () => {
      const { user_type } = await AuthClient.getCurrentUser()

      const currentResources = resources.filter((item) => {
        if (user_type === 'admin') {
          return adminTypes.includes(item.name)
        } else if (user_type === 'customer') {
          return clientTypes.includes(item.name)
        }

        return true
      })

      currentResources.map((value, id) => {
        dynamicMenuRef.current.push({
          id,
          label: toCamelCase(value.name),
          link: `/app/${value.name}`,
          // eslint-disable-next-line react/no-children-prop
          icon: <React.Fragment children={value?.icon || <ListIcon />} />,
        })
      })

      setDynamicMenu(dynamicMenuRef.current.concat(defaultLinks))
    }

    onFetch()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleMenu, [])

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      <List>
        {dynamicMenu &&
          dynamicMenu.map((link, id) => (
            <SidebarLink
              key={id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
      </List>
    </Drawer>
  )

  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth
    const breakpointWidth = theme.breakpoints.values.md
    const isSmallScreen = windowWidth < breakpointWidth

    if (isSmallScreen && isPermanent) {
      setPermanent(false)
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true)
    }
  }
}

export default withRouter(Sidebar)
