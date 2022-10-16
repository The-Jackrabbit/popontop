import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DesktopSidebar from './DesktopSidebar';

export default {
  title: 'app/DesktopSidebar',
  component: DesktopSidebar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DesktopSidebar>;

export const Desktop: ComponentStory<typeof DesktopSidebar> = (args) => {

  return (
    <div className="m-4">
      <DesktopSidebar {...args}  />
    </div>
  )
}
