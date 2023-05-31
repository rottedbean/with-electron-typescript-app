import React from 'react';

export interface IconProps {
    text?: string;
    backgroundColor?: string;
    fontSize?: string;
}

function Icon({ text, backgroundColor, fontSize }: IconProps) {
    const style = {
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        padding: '10px 20px',
        display: 'inline-block',
    };

    const mouseLeave = () => {
        style.backgroundColor = 'green';
    };

    const mouseOver = () => {
        style.backgroundColor = 'blue';
    };

    return (
        <div style={style} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            {text}
        </div>
    );
}

export default Icon;
