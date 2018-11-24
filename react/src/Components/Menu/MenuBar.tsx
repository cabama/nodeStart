import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setupTypes } from '../../Redux/Actions/setupActions'
import AvatarComponent from './AvatarComponent/AvatarComponent'

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    flexGrow: 1,
  },
}

export function MenuBarView (props: any) {
  return (
    <div >
      <AppBar position="static" style={{height: '65px'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={props.changeDrawableView}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={{flexGrow: 1}}> ReshuHormiguero </Typography>
          <AvatarComponent/>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const styledMeuBar = withStyles(styles)(MenuBarView)

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeDrawableView: (mobileDevice: boolean) => dispatch({ type: setupTypes.changeDrawableView}),
  }
}

export const MenuBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(styledMeuBar)
