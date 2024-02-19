/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material"
import { Poke } from "../data/CardData"
import CartImage from "../assets/icons/shopping-bag.svg"

function PokeCard({ poke, onAddToCart }: { poke: Poke, onAddToCart: any }) {
  return (
    <div className="poke-card">
      <img className="card-image" src={poke.images.small} alt="poke-card" />
      <div className="card-content">
        <div className="card-content-top" />
        <div className="card-content-bottom">
          <p className="card-name-text">{poke.name}</p>
          <div className="price-content">
            <span>$ {poke.price.toFixed(2)}</span><span className="with-point">{poke.stock} Cards</span>
          </div>
          <div>
            <Button className="gray-button" onClick={() => onAddToCart(poke)}>
              <img src={CartImage} alt="cart-icon" style={{ marginRight: "4px" }} /> <span>Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokeCard
