import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectComponent from './Select';

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
  component: SelectComponent,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SelectComponent>;

export const Select: ComponentStory<typeof SelectComponent> = (args) => {
  const [value, setValue] = useState<string>('');
  
  return (
    <div className="m-4 max-w-[300px]">
      <SelectComponent
        {...args}
        options={args.options}
        setChosenValue={(chosenValue: string) => {
          setValue(chosenValue);
        }}
        value={value}
      />
      <p>hello</p>
    </div>
  )
}


export const LargeList: ComponentStory<typeof SelectComponent> = (args) => {
  const [value, setValue] = useState<string>('');
  const result = [];
  for (let i = 0; i < 50 ; i++) {
    result.push({
      label: i.toString(),
      value: i.toString()
    });
  }
  return (
    <div className="m-4 max-w-[300px]">
      <SelectComponent
        {...args}
        options={result}
        setChosenValue={(chosenValue: string) => {
          setValue(chosenValue);
        }}
        value={value}
      />
      <p>hello</p>
    </div>
  )
}
