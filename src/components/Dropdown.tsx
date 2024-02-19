/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'

export type Data = {
  id: string,
  title: string,
  onClick: any
}

function Dropdown({ id, title, items }: { id: string, title: string, items: Data[] }) {
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
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={"V"}
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
      >
        {
          items.map((item: Data, index) =>
            <MenuItem key={`dropdown-item-${index}`} onClick={() => item.onClick(item.id, item.title)}>{item.title}</MenuItem>
          )
        }
      </Menu>
    </div>
  )
}

export default Dropdown
