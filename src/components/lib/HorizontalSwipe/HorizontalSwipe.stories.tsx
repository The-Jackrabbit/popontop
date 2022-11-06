import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HorizontalSwipe from './HorizontalSwipe';

export default {
  title: 'lib/HorizontalSwipe',
  component: HorizontalSwipe,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HorizontalSwipe>;

export const Template: ComponentStory<typeof HorizontalSwipe> = () => {
  const a = [1,2,3];
  return (
    <div className="m-4">
      <HorizontalSwipe>
        {a.map((val) => (
          <div key={val} className="p-8 dark:bg-neutral-800">
            <h1>{val}</h1>
          </div>
        ))}
      </HorizontalSwipe>
    </div>
  )
}

