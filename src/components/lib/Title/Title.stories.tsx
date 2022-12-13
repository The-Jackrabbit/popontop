import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './Title';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  args: {
    isReadOnly: false,
    showIntroduction: false,
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

const DESKTOP_PARAMETERS = {
  viewport: {
    defaultViewport: 'desktop',
  },
};

export const Mobile: ComponentStory<typeof Title> = (args) => {
  const [value, setValue] = useState('My storybook title');

  return (
    <div className="m-4">
      <Title
        {...args}
        chartTitle={value}
        setValue={setValue}
      />
    </div>
  )
}

export const VariantsDesktop: ComponentStory<typeof Title> = () => {
  const [value, setValue] = useState('My storybook title');
  return (
    <div className="m-4">
      <p className="text-3xl my-4">view</p>
      <Title
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="text-3xl my-4">readonly</p>
      <Title
        isReadOnly={true}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="text-3xl my-4">editing</p>
      <Title
        isActiveByDefault={true}
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="text-3xl my-4">loading</p>
      <Title
        isLoading={true}
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
    </div>
  )
}

VariantsDesktop.parameters = DESKTOP_PARAMETERS; 

export const Desktop: ComponentStory<typeof Title> = Mobile.bind({}); 

Desktop.parameters = DESKTOP_PARAMETERS; 
