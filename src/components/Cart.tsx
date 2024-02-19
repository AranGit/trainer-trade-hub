/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid } from '@mui/material'
import CloseImage from "../assets/icons/x.svg"
import { Poke, getUnDuplicatedPoke } from '../data/CardData'
import { getPriceFormat } from '../Utils';

function Cart({ selectedPokeList, onClearAll, onClose }: { selectedPokeList: Poke[], onClearAll: any, onClose: any }) {

  const unduplicatedPokeList = getUnDuplicatedPoke(selectedPokeList);

  const totalPrice = selectedPokeList.reduce((sum, poke: Poke) => {
    return poke.price + sum
  }, 0)
  return (
    <div className='cart-container'>
      <div className='layout'>
        <div className="header">
          <div>
            <h1>Cart</h1>
            <div className='font-12 cursor-pointer' onClick={onClearAll}><u>Clear all</u></div>
          </div>
          <div className="right-content">
            <Button className="red-button smallest" onClick={onClose}>
              <img src={CloseImage} alt="close-icon" />
            </Button>
          </div>
        </div>
        <div className='card-list'>
          <Grid container spacing={2} className='row-title'>
            <Grid item xs={3}>
              Item
            </Grid>
            <Grid item xs={6}>
              Qty
            </Grid>
            <Grid item xs={3} className='text-right'>
              Price
            </Grid>
          </Grid>
          {unduplicatedPokeList.map((poke: Poke, index) =>
            <Grid container spacing={2} key={`poke-cart-${index}`} className='poke-cart-detail'>
              <Grid item xs={3}>
                <img src={poke.images.small} alt="poke-cart-image" style={{ maxWidth: "100%" }} />
              </Grid>
              <Grid item xs={6}>
                <div className='font-12'>{poke.name}</div>
                <div className='font-12'>$ {getPriceFormat(poke.price)}</div>
              </Grid>
              <Grid item xs={3}>
                <div className='font-12 text-right'>$ {getPriceFormat(poke.amount * poke.price)}</div>
              </Grid>
              <Grid item xs={3}>
                <Button className="gray-button font-18" fullWidth style={{ height: "54px" }}>-</Button>
              </Grid>
              <Grid item xs={6}>
                <div className='font-18 gray-button card-amount' style={{ height: "100%" }}>{poke.amount}</div>
              </Grid>
              <Grid item xs={3}>
                <Button className="gray-button font-18" fullWidth style={{ height: "54px" }}>+</Button>
              </Grid>
            </Grid>
          )
          }
        </div>
        <div className='card-summary'>
          <div className='total-card-amount'>
            <p className='font-12'>Total card amount</p>
            <p className='font-16'>{selectedPokeList.length}</p>
          </div>
          <div className='total-card-price'>
            <p className='font-12'>Total price</p>
            <p className='font-16'>$ {
              getPriceFormat(totalPrice)
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
