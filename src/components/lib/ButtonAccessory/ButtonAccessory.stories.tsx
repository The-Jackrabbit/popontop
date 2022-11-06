import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ButtonAccessory from './ButtonAccessory';

export default {
  title: 'lib/ButtonAccessory',
  component: ButtonAccessory,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ButtonAccessory>;

export const Template: ComponentStory<typeof ButtonAccessory> = () => {
  return (
    <div className="m-4">
      <ButtonAccessory>
        hello
      </ButtonAccessory>
    </div>
  )
}

