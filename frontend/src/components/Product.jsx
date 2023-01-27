import {useDispatch} from 'react-redux'


function Product({product}) {
  const dispatch = useDispatch()
  
  return (
    <div className="product">
        
        <div>
            <h2>{product.name}</h2>
        </div>
    </div>
  )
}

export default Product