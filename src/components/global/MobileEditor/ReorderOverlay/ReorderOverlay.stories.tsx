import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ReorderOverlay from './ReorderOverlay';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export default {
  title: 'lib/ReorderOverlay',
  component: ReorderOverlay,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'iphonex',
    },
  },

} as ComponentMeta<typeof ReorderOverlay>;

export const Mobile: ComponentStory<typeof ReorderOverlay> = (args) => {

  return (
    <>
      <ReorderOverlay {...args}  />
      {[...(new Array(20))].map((_, index) => (
        <div key={index} className="px-3 py-4">
          <p>paragraph: {index+1}</p>
        </div>
      ))}
    </>
  )
}
