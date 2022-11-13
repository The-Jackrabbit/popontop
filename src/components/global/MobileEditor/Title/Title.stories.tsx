import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Title from './Title';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { useSpring } from 'react-spring';

export default {
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

export const Mobile: ComponentStory<typeof Title> = () => {
  const [titleHeightStyle, titleHeightAnimation] = useSpring(() => ({
    height: '250px',
    config: {
      bounce: 2,
      friction: 20,
      mass: 1,
      tension: 200,
    },
  }));
  
  const toggleTitle = () => {
    if (isStarted) {
      setIsFirstCloseDone(true);
      const cHeight =  titleHeightStyle.height.get();
      const height = cHeight === '20px' ? '0px' : '20px';
      titleHeightAnimation.start({ height });
    }
  };
  const [value, setValue] = useState(0);
  return (
    <>
      <Title
         chartTitle,

         isReadOnly,
         setValue,
         showIntroduction,
         textColor,
         titleHeightStyle,
      />
    </>
  )
}
