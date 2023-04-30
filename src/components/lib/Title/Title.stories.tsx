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
      <Title {...args} chartTitle={value} setValue={setValue} />
    </div>
  );
};

export const VariantsDesktop: ComponentStory<typeof Title> = () => {
  const [value, setValue] = useState('My storybook title');
  return (
    <div className="m-4">
      <p className="my-4 text-3xl">view</p>
      <Title
        backgroundColor='white'
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="my-4 text-3xl">readonly</p>
      <Title
        backgroundColor='white'
        isReadOnly={true}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="my-4 text-3xl">editing</p>
      <Title
        backgroundColor='white'
        isActiveByDefault={true}
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
      <p className="my-4 text-3xl">loading</p>
      <Title
        backgroundColor='white'
        isLoading={true}
        isReadOnly={false}
        textColor="black"
        showIntroduction={false}
        chartTitle={value}
        setValue={setValue}
      />
    </div>
  );
};

VariantsDesktop.parameters = DESKTOP_PARAMETERS;

export const Desktop: ComponentStory<typeof Title> = Mobile.bind({});

Desktop.parameters = DESKTOP_PARAMETERS;
