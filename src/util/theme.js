export default {
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff'
    },
    secondary: {
      light: '#b0ff57',
      main: '#76ff03',
      dark: '#32cb00',
      contrastText: '#000'
    }
  },
  spreadIt: {
    card: {
      display: 'flex',
      marginBottom: '2rem'
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: '1rem'
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover'
    },
    handle: {
      width: 60,
      height: 17,
      backgroundColor: '#76ff03',
      marginBottom: '.5rem'
    },
    date: {
      width: 85,
      height: 13,
      backgroundColor: '#000a12',
      marginBottom: '.5rem'
    },
    fullLine: {
      width: '90%',
      height: 15,
      backgroundColor: '#4f5b62',
      marginBottom: '.5rem'
    },
    halfLine: {
      width: '40%',
      height: 15,
      backgroundColor: '#4f5b62',
      marginBottom: '.5rem'
    },
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '.6rem 0'
    },
    pageTitle: {
      margin: '.5rem 0'
    },
    textField: {
      margin: '.5rem 0'
    },
    button: {
      margin: '2rem 0',
      position: 'relative'
    },
    progress: {
      position: 'absolute'
    },
    error: {
      color: 'red',
      fontSize: '.8rem',
      marginTop: '1rem'
    },
    clearSeparator: {
      border: 'none',
      margin: 4
    },
    separator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#32cb00'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
};
