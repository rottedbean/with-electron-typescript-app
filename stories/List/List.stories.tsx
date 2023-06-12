import React from 'react';

import { Meta, StoryObj } from '@storybook/react';
import List, { ListProps } from './List';

const meta: Meta<typeof List> = {
    title: 'Components/List',
    component: List,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        text: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Primary: Story = {
    args: {
        text: '교과 논리 논술 시험 공부 하기',
    },
};
