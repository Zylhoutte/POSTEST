import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import { toast } from 'react-toastify'
import { login, reset } from '../features/admins/adminSlice'
import Spinner  from '../components/Spinner'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'




function Admin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const { email, password, } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {admin, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)

    }

    if(isSuccess || admin) {
      navigate('/dashboard')
    }
    dispatch(reset())

  }, [admin, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }

  

  const onSubmit = (e) => {
    e.preventDefault()

    const adminData = {
      email,
      password
    }

    dispatch(login(adminData))

  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    

    <Container component="label" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
        }}> 
        
        <CssBaseline />
        <Paper variant="outlined" />
        <Typography component="h1" variant="h5">
          Admin
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color='warning'
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color='warning'
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color='warning'
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  
  
 

);

 
}

export default Admin