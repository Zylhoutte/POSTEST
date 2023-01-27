import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import SubDrawer from '../components/SubDrawer'







function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {admin} = useSelector((state) => state.auth)
 
  

  useEffect(() => {
    
    if(!user) {
      navigate('/login')
    }
    
    return () => {
    }
  }, [user, admin, navigate])

 

  return (
    <>
    <SubDrawer/>
    
    </>
  )
}

export default Dashboard