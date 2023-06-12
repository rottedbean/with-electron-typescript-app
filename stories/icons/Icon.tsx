import React from 'react';
import { action } from '@storybook/addon-actions';

import SvgIcon from '@mui/material/SvgIcon';
import { SvgIconComponent } from '@mui/icons-material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

export interface IconProps {
    backgroundColor?: string;
    fontSize?: string;
    size?: string;
}

function Icon({ backgroundColor, fontSize, size }: IconProps) {
    const style = {
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        width: size,
        height: size,
    };

    const DivStyle = styled.div`
        border: 3px solid gray;
        border-radius: 25%;
        padding: '10px 20px';
        display: 'inline-block';
        text-align: center;
        &:hover {
            background-color: black;
            box-shadow: 5px;
        }
    `;

    return <DivStyle style={style}></DivStyle>;
}

export default Icon;
