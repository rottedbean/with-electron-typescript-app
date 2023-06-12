import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import Icon, { IconProps } from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const MiddleIcon: Story = {
    args: {
        backgroundColor: '#29ABE2',
        fontSize: '12pt',
        size: '25px',
    },
};

export const BigIcon: Story = {
    args: {
        backgroundColor: '#29ABE2',
        fontSize: '15pt',
        size: '30px',
    },
};
