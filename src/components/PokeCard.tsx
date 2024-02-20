/* eslint-disable @typescript-eslint/no-explicit-any */
import { Backdrop, Button } from "@mui/material"
import { Poke } from "../data/CardData"
import CartImage from "../assets/icons/shopping-bag.svg"
import { getPriceFormat } from "../Utils"
import React from "react";

function PokeCard({ poke, onAddToCart }: { poke: Poke, onAddToCart: any }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="poke-card">
      <img className="card-image cursor-pointer" src={poke.images.small} alt="poke-card" onClick={handleOpen} />
      <div className="card-content">
        <div className="card-content-top" />
        <div className="card-content-bottom">
          <p className="card-name-text">{poke.name}</p>
          <div className="price-content">
            <span>$ {getPriceFormat(poke.price)}</span><span className="with-point">{poke.amount} Cards</span>
          </div>
          <div>
            <Button className="gray-button" onClick={() => onAddToCart(poke)} disabled={poke.amount < 1}>
              <img src={CartImage} alt="cart-icon" style={{ marginRight: "4px" }} /> <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <img className="card-image-large" src={poke.images.large} alt="poke-card-large" />
      </Backdrop>
    </div>
  )
}

export default PokeCard
