import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configureStore from 'store/configureStore';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto',
  },
});

const store = configureStore();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Root store={store} />
    </MuiThemeProvider>,
    document.getElementById('root')
);
