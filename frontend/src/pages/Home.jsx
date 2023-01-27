import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch,} from 'react-redux'
import Drawer from '../components/Drawer'
import Product from '../components/Product'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { getProducts, reset } from '../features/products/productSlice'




function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { products } = useSelector(state => state.products) || {};

  useEffect(() => {
  
    if(!user) {
      navigate('/login')
    }
    dispatch(getProducts())
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

 

  return (
    <>
    <Drawer/>
    </>
  )
}

export default Home