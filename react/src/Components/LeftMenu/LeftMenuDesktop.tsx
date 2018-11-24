import { Drawer } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: 240,
    height: 'calc(100vh - 65px)',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})

export function DrawerMenu (props: any) {

  const { classes } = props

  return (
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      {props.items}
      <Divider />
    </Drawer>
  )
}

export const LeftMenuDesktop = withStyles(styles as any)(DrawerMenu)
