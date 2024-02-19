/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid } from '@mui/material'
import CloseImage from "../assets/icons/x.svg"
import { Cards, Poke, getUnDuplicatedPoke } from '../data/CardData'
import { getPriceFormat } from '../Utils';

function Cart({ cards, selectedPokeList, onClearAll, handleCartItems, onClose }:
  {
    cards: Cards | null,
    selectedPokeList: Poke[],
    onClearAll: any,
    handleCartItems: any
    onClose: any
  }) {

  const unduplicatedPokeList = getUnDuplicatedPoke(selectedPokeList);

  const totalPrice = selectedPokeList.reduce((sum, poke: Poke) => {
    return (poke.price * poke.amount) + sum
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
          {unduplicatedPokeList.map((poke: Poke, index) => {
            const pokeInMarket = cards?.data.find((p: Poke) => p.id === poke.id);
            let disabledIncreasing = false;
            if (pokeInMarket) {
              disabledIncreasing = pokeInMarket.amount <= 0;
            } else {
              disabledIncreasing = true;
            }
            return <Grid container spacing={2} key={`poke-cart-${index}`} className='poke-cart-detail'>
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
                <Button
                  className="gray-button font-18"
                  fullWidth
                  style={{ height: "54px" }}
                  onClick={() => handleCartItems(poke, cards, false)}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={6}>
                <div className='font-18 gray-button card-amount' style={{ height: "100%" }}>{poke.amount}</div>
              </Grid>
              <Grid item xs={3}>
                <Button
                  className="gray-button font-18"
                  fullWidth
                  style={{ height: "54px" }}
                  disabled={disabledIncreasing}
                  onClick={() => handleCartItems(poke, cards, true)}
                >
                  +
                </Button>
              </Grid>
            </Grid>
          }
          )
          }
        </div>
        <div className='card-summary'>
          <div className='total-card-amount'>
            <p className='font-12'>Total card amount</p>
            <p className='font-16'>{selectedPokeList.reduce((sum, poke: Poke) => {
              return poke.amount + sum
            }, 0)}</p>
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

    </div >
  )
}

export default Cart
