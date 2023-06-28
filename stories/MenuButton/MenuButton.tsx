import React from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export interface MenuButtonProps {
    text?: string;
    size?: number;
}

function MenuButton({ text }: MenuButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const clickEvent = () => {
        console.log('!');
        setAnchorEl(null);
    };

    const menuStyle = {
        fontSize: '10pt',
        height: '25px',
    };

    return (
        <div>
            <IconButton
                children={<MoreHorizIcon color='disabled' />}
                onClick={handleClick}
            />
            <Menu
                id='demo-positioned-menu'
                aria-labelledby='demo-positioned-button'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    style: {
                        fontSize: '8pt',
                    },
                }}
            >
                <MenuItem onClick={clickEvent} style={menuStyle}>
                    Delete
                </MenuItem>
                <MenuItem onClick={clickEvent} style={menuStyle}>
                    Modify
                </MenuItem>
                <MenuItem onClick={clickEvent} style={menuStyle}>
                    Copy
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MenuButton;
