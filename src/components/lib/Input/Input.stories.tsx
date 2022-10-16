import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'lib/Input',
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Input>;

export const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('');
  return (
    <div className="m-4">
      <Input {...args}  onChange={(event) => setValue(event.target.value)} value={value} />
    </div>
  )
}
