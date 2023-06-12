import React from 'react';

import Icon from '../icons/Icon';
import styled from '@emotion/styled';
import { MiddleIcon, BigIcon } from '../icons/Icon.stories';

export interface ListProps {
    text?: string;
    size?: number;
}

function List({ text }: ListProps) {
    const DivStyle = styled.div`
        width: 300px;
        height: 40px;
        background-color: lightgray;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0px 5px;
        gap: 10px;
    `;

    const TextStyle = styled.p`
        font-size: 12pt;
        font-family: 'Pretendard-Medium';
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
            <Icon {...MiddleIcon.args} />
            <TextStyle>{text}</TextStyle>
        </DivStyle>
    );
}

export default List;
