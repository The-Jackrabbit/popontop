import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpandingPill from './ExpandingPill';

export default {
  args: {
    label: 'Border color'
  },
  title: 'lib/ExpandingPill',
  component: ExpandingPill,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ExpandingPill>;

export const Single: ComponentStory<typeof ExpandingPill> = (args) => {

  return (
    <div className="m-4 max-w-[220px]">
      <ExpandingPill {...args}  />
    </div>
  )
}

export const List: ComponentStory<typeof ExpandingPill> = (args) => {
  const fruits = [
    'peach',
    'plum',
    'pear',
    'grapes',
    'orange',
    'apple',
    'mango',
    'watermelon'
  ]
  return (
    <div className="gap-1 flex flex-row m-4 w-[300px] flex-wrap items-center ">
      {fruits.map(((fruit) => (
        <ExpandingPill
          className=""
          label={fruit}
          key={fruit}
        />
      )))}
    </div>
  )
}
