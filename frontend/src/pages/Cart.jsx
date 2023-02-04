import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const Cart = () => {

    const [subTotal, setSubTotal] = useState(0);
    const [billPopUp, setBillPopUp] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector(state => state.rootReducer);

    const handlerIncrement = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: {...record, quantity: record.quantity + 1}
        });
    };

    const handlerDecrement = (record) => {
        if(record.quantity !== 1){
            dispatch({
                type: "UPDATE_CART",
                payload: {...record, quantity: record.quantity - 1}
            });
        }
    };

    const handlerDelete = (record) => {
        dispatch({
            type: "DELETE_FROM_CART",
            payload: record
        });
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render:(image, record) => <img src={image} alt={record.name} height={60} width={60} />
        }, 
        {
            title: "Price",
            dataIndex: "price",
        }
        , 
        {
            title: "Quantity",
            dataIndex: "_id",
            render:(_id, record) => 
                <div>
                    <RemoveCircleOutlineOutlinedIcon className='cart-minus' onClick={() => handlerDecrement(record)}/>
                    <strong className='cart-quantity'>{record.quantity}</strong>
                    <AddCircleOutlineOutlinedIcon className='cart-plus' onClick={() => handlerIncrement(record)} />
                </div>
        }
        , 
        {
            title: "Action",
            dataIndex: "_id",
            render:(_id, record) => <DeleteOutlineOutlinedIcon className='cart-action' onClick={() => handlerDelete(record)} />
        }
    ]

    useEffect(() => {

        let temp = 0;
        cartItems.forEach((product) => (temp = temp + product.price * product.quantity));
        setSubTotal(temp); 

    }, [cartItems]);

    const handlerSubmit = async (value) => {
        //console.log(value);
        try {
            const newObject = {
                ...value,
                cartItems,
                subTotal,
                tax: Number(((subTotal / 100) * 10).toFixed(2)),
                totalAmount: Number((Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)),
                user: JSON.parse(localStorage.getItem('auth'))._id
            }
            await axios.post("/api/bills/addbills", newObject);
            navigate("/bills");
        } catch(error) {
            console.log(error);
        }
    }
  return (
    <>
      <h2>Cart</h2>
      <div className="subTotal">
        <h2>Sub Total: <span>$ {(subTotal).toFixed(2)}</span></h2>
        <Button onClick={(paymentMethod) => setBillPopUp(true)} className='add-new'>Create Invoice</Button>
      </div>
     
        <FormControl layout='vertical' onClick={handlerSubmit}>
            <TextField name="customerName" label="Customer Name">
            </TextField>
            <TextField name="customerPhone" label="Customer Phone">
            </TextField>
            <TextField name="customerAddress" label="Customer Address">
            </TextField>
            <RadioGroup>
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
            <FormControlLabel value="Card" control={<Radio />} label="Card" />
            </RadioGroup>
            <div className="total">
                <span>SubTotal: ${(subTotal.toFixed(2))}</span><br />
                <span>Tax: ${((subTotal / 100) * 10).toFixed(2)}</span>
                <h3>Total: ${(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))).toFixed(2)}</h3>
            </div>
            <div className="form-btn-add">
              <Button type='submit' className='add-new'>Generate Invoice</Button>
            </div>  
           </FormControl>

      </>
  )
}

export default Cart
