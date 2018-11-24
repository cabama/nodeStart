import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { RouteComponentProps, withRouter } from 'react-router'
import { Dispatch } from 'redux'
import { setupTypes } from '../../Redux/Actions/setupActions'
import { ISetUpStore } from '../../Redux/Store/setupStore'
import { LeftMenuDesktop } from './LeftMenuDesktop'
import { LeftMenuResposive } from './LeftMenuResposive'

import {AttachMoney, Inbox, NoteAdd, Today} from '@material-ui/icons'

const menuElements = [
  { title: 'Main', icon: Inbox, path: '/' },
  { title: 'Notes', icon: NoteAdd, path: '/profile' },
  { title: 'Calendar', icon: Today, path: '/' },
  { title: 'Billing', icon: AttachMoney, path: '/' },
]

type DrawableProps = IStateToProps & IDispatchToProps & RouteComponentProps

class Drawablemenu extends React.Component<DrawableProps> {

  constructor (props: DrawableProps, state: any) {
    super(props, state)
  }

  public ListItems = (close: () => void) => {
    return (
    menuElements.map((element) => this.makeElementList({ ...element, close }))
    )
  }

  public render () {
    return (
      <MediaQuery maxDeviceWidth={1224}>
        {(matches) => this.getDrawableMenu(matches)}
      </MediaQuery>
    )
  }

  public getDrawableMenu = (matches: boolean) => {
    const visible = this.props.state.setup.isDrawableVisible
    const close = this.props.dispatcher.closeMenu
    if (matches) return <LeftMenuResposive visible={visible} close={close} items={this.ListItems(close)}/>
    else return <LeftMenuDesktop visible={visible} close={close} items={this.ListItems(close)}/>
  }

  private makeElementList (element: { title: string, icon: React.ComponentType, path: string, close: () => void }) {
    const {title, icon, path, close } = element
    const onClose = () => {
      this.props.history.push(path)
      close()
    }
    return (
      <ListItem button={true} onClick={onClose}>
      <ListItemIcon>
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
    )
  }

}

interface IStateToProps {
  state: {
    setup: ISetUpStore,
  }
}

const mapStateToProps = (state: any): IStateToProps => {
  return {
    state: {
      setup: state.setup,
    },
  }
}

interface IDispatchToProps {
  dispatcher: {
    closeMenu: () => void,
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    dispatcher: {
      closeMenu: () => dispatch(
        { type: setupTypes.closeDrawable },
      ),
    },
  }
}

export const LeftMenu = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawablemenu))
