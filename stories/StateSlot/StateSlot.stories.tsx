import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import StateSlot, { StateSlotProps } from './StateSlot';

const meta: Meta<typeof StateSlot> = {
    title: 'Components/StateSlot',
    component: StateSlot,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};

export default meta;
type Story = StoryObj<typeof StateSlot>;

export const MiddleDefaultStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 25,
        state: 1,
    },
};

export const BigDefaultStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 30,
        state: 1,
    },
};

export const MiddleCanceledStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 25,
        state: 2,
    },
};

export const BigCanceledStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 30,
        state: 2,
    },
};

export const MiddleDelayedStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 25,
        state: 3,
    },
};

export const BigDelayedStateSlot: Story = {
    args: {
        backgroundColor: '#29ABE2',
        size: 30,
        state: 3,
    },
};
