export default {
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#66ffa6',
      main: '#00e676',
      dark: '#00b248',
      contrastText: '#000'
    }
  },
  spreadIt: {
    whiteText: {
      color: '#fff'
    },
    greyText: {
      color: '#949494'
    },
    card: {
      position: 'relative',
      marginBottom: '2rem',
      backgroundColor: '#444444'
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
      margin: '.5rem 0',
      color: '#fff'
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
      padding: 20,
      backgroundColor: '#444444'
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
          color: '#00e676'
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
