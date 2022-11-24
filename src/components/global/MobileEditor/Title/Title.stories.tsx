import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './Title';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  args: {
    isReadOnly: false,
    showIntroduction: true,
    textColor: 'green',
  },
  title: 'lib/Title',
  component: Title,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'iphonex',
    },
  },

} as ComponentMeta<typeof Title>;

export const Mobile: ComponentStory<typeof Title> = (args) => {
  const toggleTitle = () => console.log('changing');
  const [value, setValue] = useState('My storybook title');

  return (
    <div className="m-4">
      <Title
        {...args}
        chartTitle={value}
        setValue={setValue}
      />
      <button className="mt-8" onClick={() => toggleTitle()}>toggle</button>
    </div>
  )
}
