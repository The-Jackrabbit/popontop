import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from './Select';

export default {
  args: {
    label: 'Fruit',
    options: [
      {
        label: 'Peach',
        value: 'peach'
      },
      {
        label: 'Plum',
        value: 'plum'
      },
      {
        label: 'Pear',
        value: 'pear'
      },
    ],
  },
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
            value: '2',
          },
          {
            label: 'Pear',
            value: '3',
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
