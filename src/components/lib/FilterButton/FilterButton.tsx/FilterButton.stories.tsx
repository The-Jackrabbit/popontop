import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FilterButton from './FilterButton';
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/solid';

export default {
  args: {
    backgroundGradient: '',
    className: '',
  },
  title: 'lib/FilterButton',
  component: FilterButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof FilterButton>;

export const Single: ComponentStory<typeof FilterButton> = (args) => {
  return (
    <div className="m-8">
      <FilterButton
        {...args}
        onClick={() => undefined}
      >
        <ChevronUpDownIcon
          className="
            h-6 w-6 translate-y-[1px]
            text-neutral-900 dark:text-neutral-50
          "
        />
      </FilterButton>
    </div>
   )
};

export const Multiple: ComponentStory<typeof FilterButton> = () => {
  return (
    <>
      <div className="m-8">
        <FilterButton
          onClick={() => undefined}
        >
          <ChevronUpDownIcon
            className="
              h-6 w-6 translate-y-[1px]
              text-neutral-900 dark:text-neutral-50
            "
          />
        </FilterButton>
      </div>
      <div className="m-8">
        <FilterButton
          onClick={() => undefined}
        >
          <TrashIcon
            className="
              h-4 w-4 translate-y-[1px]
              text-neutral-900 dark:text-neutral-50
            "
          />
        </FilterButton>
      </div>
    </>
   )
};
