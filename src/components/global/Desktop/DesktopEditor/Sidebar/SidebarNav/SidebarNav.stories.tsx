import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SidebarNav from './SidebarNav';

export default {
  title: 'app/SidebarNav',
  component: SidebarNav,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SidebarNav>;

export const Desktop: ComponentStory<typeof SidebarNav> = (args) => {
  return (
    <div className="m-4 mt-[400px] mr-[200px] w-[300px]">
      <SidebarNav {...args} />
    </div>
  );
};
