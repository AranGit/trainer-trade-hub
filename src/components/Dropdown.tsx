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
        {title}
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
          items.map((item: Data, index) =>
            <MenuItem
              className={`${selectedItem ? "active" : ""}`} key={`dropdown-item-${index}`}
              onClick={() => item.onClick(item)}>
              {item.title}
            </MenuItem>
          )
        }
      </Menu>
    </div>
  )
}

export default Dropdown
