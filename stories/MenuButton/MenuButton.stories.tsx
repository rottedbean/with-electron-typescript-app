import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import MenuButton, { MenuButtonProps } from './MenuButton';

const meta: Meta<typeof MenuButton> = {
    title: 'Components/MenuButton',
    component: MenuButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Primary: Story = {};
