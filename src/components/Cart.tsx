/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material'
import CloseImage from "../assets/icons/x.svg"
import { Poke } from '../data/CardData'

function Cart({ selectedPokeList, onClose }: { selectedPokeList: Poke[], onClose: any }) {
  const totalPrice = selectedPokeList.reduce((sum, poke: Poke) => {
    return poke.price + sum
  }, 0)
  return (
    <div className='cart-container'>
      <div className='layout'>
        <div className="header">
          <div>
            <h1>Cart</h1>
            <div className='font-12'><u>Clear all</u></div>
          </div>
          <div className="right-content">
            <Button className="red-button smallest" onClick={onClose}>
              <img src={CloseImage} alt="close-icon" />
            </Button>
          </div>
        </div>
        <div className='card-list'>
          <div className='column-title'>

          </div>
        </div>
        <div className='card-summary'>
          <div className='total-card-amount'>
            <p className='font-12'>Total card amount</p>
            <p className='font-16'>{selectedPokeList.length}</p>
          </div>
          <div className='total-card-price'>
            <p className='font-12'>Total price</p>
            <p className='font-16'>$ {
              totalPrice.toLocaleString('en-US', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }</p>
          </div>
          <Button className="red-button" fullWidth>
            Continue to Payment
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Cart
