import React from 'react'
import Routes from './routes'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'

const greenTheme = createMuiTheme({
  typography: {
    fontFamily: '"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif'
  },
  palette: {
    primary: {
      main: '#69dcff'
    },
    secondary: {
      main: '#69dcff'
    },
    type: 'dark'
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color'
        }
      }
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={greenTheme}>
      <div>
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
