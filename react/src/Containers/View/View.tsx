import { Grid } from '@material-ui/core'
import * as React from 'react'
import { LeftMenu } from '../../Components/LeftMenu/LeftMenu'
import { MenuBar } from '../../Components/Menu/MenuBar'

const AppStyle: React.CSSProperties = {
  flexGrow: 1,
  zIndex: 1,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
}

const MainStyle: React.CSSProperties = {
  flexGrow: 1,
  minWidth: 0,
  paddingTop: '10px',
  paddingBottom: '10px',
}

interface IProps {
  MenuBar: boolean
  SideMenu: boolean
  className?: string
}

class View extends React.Component <IProps> {

  constructor (props: IProps) {
    super(props)
  }

  public render () {
    return (
      <div className={`View ${this.props.className}`}>
          {this.getMenuBar()}
        <div style={{ ...AppStyle, height: 'calc(100% - 56px)'}}>
          {this.getSideMenu()}
          <Grid container={true} justify="center" style={MainStyle}>
            {this.props.children}
          </Grid>
        </div>
      </div>
    )
  }

  private getSideMenu () {
    return this.props.SideMenu
      ? <LeftMenu />
      : null
  }

  private getMenuBar () {
    return this.props.MenuBar
      ? <MenuBar/>
      : null
  }
}

export default View
