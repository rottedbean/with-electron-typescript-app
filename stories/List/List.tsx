import React from 'react';

import StateSlot from '../StateSlot/StateSlot';
import MenuButton from '../MenuButton/MenuButton';
import styled from '@emotion/styled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MiddleDelayedStateSlot } from '../StateSlot/StateSlot.stories';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';

export interface ListProps {
    text?: string;
    size?: number;
}

function List({ text }: ListProps) {
    const DivStyle = styled.div`
        width: 350px;
        height: 40px;
        background-color: lightgray;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0px 5px;
    `;

    const TextStyle = styled.p`
        font-size: 12pt;
        font-family: 'Pretendard-Medium';
        width: 260px;
        padding: 0px 10px;
        @font-face {
            font-family: 'Pretendard-Medium';
            src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
                format('woff');
            font-weight: 700;
            font-style: normal;
        }
    `;

    return (
        <DivStyle>
            <StateSlot {...MiddleDelayedStateSlot.args} />
            <TextStyle>{text}</TextStyle>
            <MenuButton />
        </DivStyle>
    );
}

export default List;
