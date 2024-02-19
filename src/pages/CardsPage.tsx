import { Button, CircularProgress, Divider } from "@mui/material"
import CartImage from "../assets/icons/shopping-bag.svg"

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '../assets/icons/search.svg'
import { useEffect, useState } from "react"
import { Cards, Poke } from "../data/CardData"
import { getCards, params } from '../apis/CardApi'
import PokeCard from "../components/PokeCard"

function CardsPage() {
  const [searchText, setSearchText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cards, setCards] = useState<Cards | null>(null)

  useEffect(() => {
    setIsLoading(true);
    getCards({
      queryParams: params,
      onSuccess:
        (newCards: Cards) => {
          setCards(newCards);
          setIsLoading(false);
        }
      ,
      onFailed: () => setIsLoading(false)
    });
  }, [])

  return (
    <div className="cards-page">
      <div className="header">
        <div>
          <h1>Pokemon market</h1>
        </div>
        <div className="right-content">
          <Paper
            className="input-search-form"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            onSubmit={e => e.preventDefault()}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <img src={SearchIcon} alt="search-icon" />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by Name"
              inputProps={{ 'aria-label': 'Search by Name' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Paper>
          <Button className="red-button smallest">
            <img src={CartImage} alt="cart-icon" />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="cards-panel">
        {
          isLoading ? <CircularProgress /> :
            cards?.data.map((poke: Poke) =>
              <PokeCard poke={poke} />
            )
        }
      </div>
    </div>
  )
}

export default CardsPage
