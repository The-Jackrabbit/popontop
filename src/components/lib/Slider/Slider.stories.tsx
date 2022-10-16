import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Slider from './Slider';

export default {
  title: 'lib/Slider',
  component: Slider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Slider>;

export const Template: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = useState('0');
  return (
    <div className="m-4">
      <Slider {...args}  onChange={(event) => setValue(event.target.value)} value={value} />
    </div>
  )
}
