import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './Title';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { useSpring } from 'react-spring';

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
  const INTRODUCTION_HEIGHT = '250px';
  const REGULAR_HEIGHT = '60px';
  const MINIFIED_HEIGHT = '0px';
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    height: INTRODUCTION_HEIGHT,
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    const cHeight =  titleHeightStyle.height.get();
    const height = cHeight === REGULAR_HEIGHT ? MINIFIED_HEIGHT : REGULAR_HEIGHT;
    titleHeightAnimation.start({ height });
  };
  const [value, setValue] = useState('My storybook title');

  return (
    <div className="m-4">
      <Title
        {...args}
        chartTitle={value}
        setValue={setValue}
        titleHeightStyle={titleHeightStyle}
      />
      <button className="mt-8" onClick={() => toggleTitle()}>toggle</button>
    </div>
  )
}
