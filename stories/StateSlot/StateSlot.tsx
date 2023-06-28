import React from 'react';
import { action } from '@storybook/addon-actions';

import ClearIcon from '@mui/icons-material/Clear';
import ForwardIcon from '@mui/icons-material/Forward';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { fontSize } from '@mui/system';

export interface StateSlotProps {
    backgroundColor?: string;
    size?: number;
    state?: number;
}

function StateSlot({ backgroundColor, size, state }: StateSlotProps) {
    function HomeIcon() {
        if (state == 1) return null;
        else if (state == 2) return <ClearIcon />;
        else return <ForwardIcon />;
        return null;
    }
    ('');
    const DivStyle = styled.div`
        background-color: ${backgroundColor};
        width: ${size}px;
        height: ${size}px;
        border: 3px solid gray;
        border-radius: 25%;
        text-align: center;
        position: relative;
    `;

    const IconDiv = styled.div`
        width: ${size}px;
        height: ${size}px;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${fontSize};
    `;

    const Screen = styled.div`
        background-color: rgba(80, 80, 80, 0);
        width: ${size}px;
        height: ${size}px;
        border-radius: 23%;
        &:hover {
            background-color: rgba(80, 80, 80, 0.3);
        }
        position: absolute;
        left: 0px;
        right: 0px;
    `;

    return (
        <DivStyle onClick={action('clicked')}>
            <IconDiv>
                <HomeIcon />
            </IconDiv>
            <Screen />
        </DivStyle>
    );
}

export default StateSlot;
