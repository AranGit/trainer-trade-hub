import { Button, CircularProgress, Divider, Pagination, Stack, SwipeableDrawer } from "@mui/material"
import CartImage from "../assets/icons/shopping-bag.svg"

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '../assets/icons/search.svg'
import { useEffect, useState } from "react"
import { Cards, Poke } from "../data/CardData"
import { getCards, defalutParams, QueryParams } from '../apis/CardApi'
import PokeCard from "../components/PokeCard"
import Cart from "../components/Cart"

function CardsPage() {
  const [searchText, setSearchText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cards, setCards] = useState<Cards | null>(null)
  const [openCart, setOpenCart] = useState<boolean>(false)
  const [selectedCards, setSelectedCard] = useState<Poke[]>([])

  const fetchCardsData = (params: QueryParams) => {
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
  }

  useEffect(() => {
    fetchCardsData(defalutParams)
  }, [])

  let pagesCount = 0
  if (cards) {
    pagesCount = Math.round(cards.totalCount / cards.pageSize);
  }

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
          <Button className="red-button smallest" onClick={() => setOpenCart(true)}>
            <img src={CartImage} alt="cart-icon" />
          </Button>
        </div>
      </div>
      <Divider />
      {
        isLoading ? <CircularProgress style={{ margin: "auto", display: "block" }} /> :
          <>
            <div className="cards-filter-content">
              <h3>Choose Card</h3>

            </div>
            <div className="cards-panel">
              {
                cards?.data.map((poke: Poke) =>
                  <PokeCard poke={poke} onAddToCart={(selectedCard: Poke) => setSelectedCard([...selectedCards, selectedCard])} />
                )
              }
            </div>
            <div style={{ margin: "12px" }}>
              {
                pagesCount > 0 ?
                  <Stack spacing={2}>
                    <Pagination
                      count={pagesCount}
                      page={cards?.page}
                      shape="rounded"
                      siblingCount={0}
                      onChange={(e, value: number) => {
                        fetchCardsData({
                          ...defalutParams,
                          page: value.toString()
                        })
                      }}
                    />
                  </Stack>
                  : null
              }
            </div>
            <SwipeableDrawer
              anchor="right"
              open={openCart}
              onClose={() => setOpenCart(false)}
              onOpen={() => setOpenCart(true)}
            >
              <Cart selectedPokeList={selectedCards} onClose={() => setOpenCart(false)} />
            </SwipeableDrawer>
          </>}
    </div>
  )
}

export default CardsPage
