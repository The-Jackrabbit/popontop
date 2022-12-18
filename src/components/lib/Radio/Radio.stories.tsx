import React, { useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import Radio from './Radio';

export default {
  args: {},
  title: 'lib/Radio',
  component: Radio,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Radio>;

export const Boolean: React.FC = ({}) => {
  const [value, setValue] = useState(false);

  return (
    <div className="m-4 max-w-[220px]">
      <Radio value={value} onClick={(value: boolean) => setValue(value)} />
    </div>
  );
};
