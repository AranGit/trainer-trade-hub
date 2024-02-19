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
  const [selectedCards, setSelectedCards] = useState<Poke[]>([])

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

  const onAddToCart = (selectedCard: Poke, cardsData: Cards) => {
    //Need to refactor
    const newData: Poke[] = cardsData.data.map((p: Poke) => {
      if (p.id === selectedCard.id) {
        return {
          ...p,
          amount: p.amount - 1
        }
      } else {
        return p;
      }
    })
    const updatedCards: Cards = {
      ...cardsData,
      data: newData
    }
    const duplicatedPoke = selectedCards.find((p: Poke) => p.id === selectedCard.id)
    if (duplicatedPoke) {
      const updatedSelectedCards: Poke[] = selectedCards.map((p: Poke) => {
        if (p.id === selectedCard.id) {
          return {
            ...selectedCard,
            amount: p.amount + 1
          }
        } else {
          return p;
        }
      })
      setSelectedCards(updatedSelectedCards);
    } else {
      setSelectedCards([...selectedCards, { ...selectedCard, amount: 1 }]);
    }
    setCards(updatedCards)
  }

  const allCardsLength = cards ? cards.data.length : 0;

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
            onSubmit={e => {
              e.preventDefault()
              fetchCardsData({
                ...defalutParams,
                q: searchText,
              })
            }}
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
                allCardsLength < 1 && searchText !== "" ?
                  <div className="text-center" style={{ width: "100%" }}>No card found for "{searchText}"</div> :
                  cards?.data.map((poke: Poke, index) =>
                    <PokeCard
                      key={`PokeCard-${index}`}
                      poke={poke}
                      onAddToCart={(selectedCard: Poke) => onAddToCart(selectedCard, cards)}
                    />
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
                      onChange={(_e, value: number) => {
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
              <Cart
                selectedPokeList={selectedCards}
                onClearAll={() => {
                  //Need to refactor
                  if (cards) {
                    const updatedCardsData = cards.data.map((poke: Poke) => {
                      const targetPoke = selectedCards.find((p: Poke) => p.id === poke.id);
                      if (targetPoke) {
                        return {
                          ...poke,
                          amount: poke.amount + targetPoke.amount
                        }
                      } else {
                        return poke
                      }
                    }
                    )
                    const updatedCards: Cards | null = {
                      ...cards,
                      data: updatedCardsData
                    }
                    setCards(updatedCards);
                  }
                  setSelectedCards([]);
                }}
                onClose={() =>
                  setOpenCart(false)}
              />
            </SwipeableDrawer>
          </>}
    </div>
  )
}

export default CardsPage
