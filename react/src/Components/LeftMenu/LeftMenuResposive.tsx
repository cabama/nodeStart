import { Drawer } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { StyleRulesCallback, withStyles } from '@material-ui/core/styles'
import * as React from 'react'

const drawerWidth = 240

const styles: StyleRulesCallback = (theme: any) => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

interface IDrawerMenuResposiveProps {
  classes: any
  theme?: any
  visible: any
  close: any
  items: any
}

class DrawerMenuResposive extends React.Component<IDrawerMenuResposiveProps, any> {

  constructor (props: IDrawerMenuResposiveProps, state: any) {
    super(props)
    this.state = { mobileOpen: true}
  }

  public render () {
    const { classes, theme } = this.props
    return (
      <Drawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={this.props.visible}
        onClose={this.props.close}
        classes={{ paper: classes.drawerPaper}}
        ModalProps={{ keepMounted: true }}
      >
        {this.props.items}
        <Divider />
      </Drawer>
    )
  }

}

export const LeftMenuResposive = withStyles(styles, { withTheme: true })(DrawerMenuResposive)
