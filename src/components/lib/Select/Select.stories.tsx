import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from './Select';

export default {
  title: 'lib/Select',
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Select>;

export const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState<string>('');
  
  return (
    <div className="m-4">
      <Select
        {...args}
        options={[
          {
            label: 'Peach',
            value: '1',
          },
          {
            label: 'Plum',
            value: '1',
          },
          {
            label: 'Pear',
            value: '1',
          }
        ]}
        setChosenValue={(chosenValue: string) => {
          setValue(chosenValue);
        }}
        value={value}
      />
    </div>
  )
}
