import { Button, Divider } from "@mui/material"
import CartImage from "../assets/icons/shopping-bag.svg"

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '../assets/icons/search.svg'
import { useState } from "react"

function CardsPage() {
  const [searchText, setSearchText] = useState<string>("")

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
    </div>
  )
}

export default CardsPage
