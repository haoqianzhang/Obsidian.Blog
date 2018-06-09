import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import JssProvider from 'react-jss/lib/JssProvider'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

import App from './App'



const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#262D47',
        },
        secondary: {
            main: '#4A4A4A',
        },
        textPrimary: {
            main: 'black',
        },
        paperBackground: {
            main: 'white',
        }
    },
    typography: {
        fontFamily: [
            'Verdana',
            '"Avenir Next"', 
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(',')
    }
})
const generateClassName = createGenerateClassName()
const jss = create(jssPreset())
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = 'jss-insertion-point'


class BaseApp extends Component {
    componentWillMount() {
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <JssProvider jss={jss} generateClassName={generateClassName}>
                    <Router>
                        <App />
                    </Router>
                </JssProvider>
            </MuiThemeProvider>
        )
    }
}

export default BaseApp
