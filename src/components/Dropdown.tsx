/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type Data = {
  id: string,
  title: string,
  onClick: any
}

function Dropdown({ id, title, selectedItem, items }: { id: string, title: string, selectedItem: Data | null, items: Data[] }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let buttonTitle = title
  if (selectedItem) {
    buttonTitle = selectedItem.title
  }
  return (
    <div className='dropdown'>
      <Button
        id={`${id}-button`}
        className='dropdown-button'
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <p>{buttonTitle}</p>
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${id}-button`,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {
          items.map((item: Data, index) => {
            let className = ""
            if (selectedItem) {
              className = selectedItem.id === item.id ? "active" : ""
            }
            return <MenuItem
              className={className} key={`dropdown-item-${index}`}
              onClick={() => {
                item.onClick(item);
                setAnchorEl(null);
              }}>
              {item.title}
            </MenuItem>
          }
          )
        }
      </Menu>
    </div>
  )
}

export default Dropdown
