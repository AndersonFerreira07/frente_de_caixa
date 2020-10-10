import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9f3633',
      contrastText: '#fcc827',
    },
    secondary: {
      main: '#9f3633',
      // contrastText: '#fcc827',
    },
    contrastThreshold: 3,

    tonalOffset: 0.2,
  },
  /* sidebar: {
        width: 300, // The default value is 240
        closedWidth: 70, // The default value is 55
    }, */

  shape: {
    // borderRadius: 10,
  },

  overrides: {
    /* RaMenuItemLink: {
            root: {
                borderLeft: '3px solid #fff',
            },
            active: {
                borderLeft: '3px solid #4f3cc9',
            },
        }, */
    /* MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            },
            root: {
                border: '1px solid red',
                backgroundClip: 'padding-box',
            },
        }, */
    /* MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        }, */
    /*  MuiTableRow: {
            head: {
              backgroundColor: 'blue',
              "& > div ": {
                backgroundColor: 'blue',
              },
              "& > th ": {
                color: 'black',
                backgroundColor: 'blue',
                fontWeight: 'bold',
                borderRadius: 10,
              }
            },
        }, */
    MuiAppBar: {
      root: {
        border: 0,
      },
    },
    /* MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: '#f5f5f5',
            },
            barColorPrimary: {
                backgroundColor: '#d7d7d7',
            },
        }, */
    /* MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        }, */
  },
});

export default theme;
