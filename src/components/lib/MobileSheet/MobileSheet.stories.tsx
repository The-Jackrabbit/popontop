import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MobileSheet from './MobileSheet';

export default {
  title: 'lib/MobileSheet',
  component: MobileSheet,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MobileSheet>;

export const Empty: ComponentStory<typeof MobileSheet> = () => {
  return (
    <MobileSheet onClose={() => undefined}></MobileSheet>
  )
}

export const Stacked: ComponentStory<typeof MobileSheet> = () => {
  return (
    <>
      <MobileSheet layer={0} isTop={false} onClose={() => undefined}></MobileSheet>
      <MobileSheet layer={1} onClose={() => undefined}></MobileSheet>
    </>
  )
}
