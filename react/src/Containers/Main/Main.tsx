import { Icon } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import * as React from 'react'
import { connect } from 'react-redux'
import { Fetch } from '../../Services/FetchService'
import View from '../View/View'

class MainPage extends React.Component {

  public componentDidMount () {
    const fetch = new Fetch()

    fetch.fetch({url: 'http://localhost:2525/api/users/all'})
      .then((response) => {
        (window as any).carlos = response
        console.log(response.json())
      })
      .catch((error) => { console.log(error.message)})
  }

  public handleAuth () {
    // googleAuth().then((value) => ((window as any).gauth = value))
    const url = 'http://localhost:2525/api/google'
    const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0`

    window.open(url, '_blank', windowOpts)
  }

  public render () {
    return (
      <View MenuBar={true} SideMenu={true}>
        <Button onClick={this.handleAuth} variant="raised" color="primary" style={{ marginTop: '10px' }}>
          <Icon>home</Icon>
          Main Page
        </Button>
      </View>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    state: {
      ...state,
    },
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    counter_add: (type: string) => dispatch({
      type,
    }),
  }
}

export const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPage)
