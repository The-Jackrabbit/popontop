import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ClickCircle from './ClickCircle';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { SessionProvider } from 'next-auth/react';

export default {
  args: {
    backgroundGradient: '',
    className: '',
  },
  title: 'lib/ClickCircle',
  component: ClickCircle,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ClickCircle>;

export const Single: ComponentStory<typeof ClickCircle> = (args) => {
  return (
    <SessionProvider session={null}>
      <div className="m-8">
        <ClickCircle
          isLoading={false}
          saveChart={() => new Promise((res) => res('hello'))}
        />
      </div>
    </SessionProvider>
   )
};
