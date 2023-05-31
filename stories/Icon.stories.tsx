import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import Icon, { IconProps } from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        text: { control: 'text' },
        backgroundColor: { control: 'color' },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
    args: {
        text: 'Primary',
        backgroundColor: 'green',
        fontSize: '12pt',
    },
};

export const Small: Story = {
    args: {
        text: 'Small',
        backgroundColor: 'green',
        fontSize: '10pt',
    },
};

export const Middle: Story = {
    args: {
        text: 'Middle',
        backgroundColor: 'green',
        fontSize: '15pt',
    },
};

export const Big: Story = {
    args: {
        text: 'Big',
        backgroundColor: 'green',
        fontSize: '20pt',
    },
};
