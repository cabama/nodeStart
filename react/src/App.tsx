import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore, Store } from 'redux'

import { colors, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import './App.css'
// import { LeftMenuDesktop } from './Components/LeftMenu/LeftMenuDesktop'
import { MainView } from './Components/Router/RouterView'
import { MyStore } from './Redux/Store/Store'

const theme = createMuiTheme(
  {
    palette: {
      primary: colors.purple,
      secondary: colors.yellow,
    },
  },
)

class App extends React.Component {

  private store: any

  constructor (props: any) {
    super(props)

    const reduxDevTools = process.env.REACT_APP_MODE === 'DEV'
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : undefined

    this.store = createStore(
      MyStore,
      {},
      reduxDevTools,
    ) as Store<any>

  }

  public render () {
    return (
      <div className="App">
        <Provider store={this.store}>
          <MuiThemeProvider theme={theme}>
            <MainView />
          </MuiThemeProvider>
        </Provider>
      </div>
    )
  }
}

export default App
