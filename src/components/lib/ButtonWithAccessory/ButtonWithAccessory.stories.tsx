import React from 'react';
import { ComponentMeta } from '@storybook/react';
import ButtonWithAccessory, {
  LEFT_POSITION_STYLE,
  TOP_POSITION_STYLE,
} from './ButtonWithAccessory';
import Button, { Props } from '../Button/Button';

export interface StorySpecificProps {
  leftPositioningText: string;
  topPositioningText: string;
}

export default {
  args: {
    leftPositioningText: 'left',
    topPositioningText: 'top',
  },
  title: 'lib/ButtonWithAccessory',
  component: ButtonWithAccessory,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ButtonWithAccessory>;

export const Template: React.FC<Props & StorySpecificProps> = ({
  leftPositioningText,
  topPositioningText,
}) => {
  return (
    <div className="m-24 mx-48">
      <ButtonWithAccessory {...TOP_POSITION_STYLE} label={topPositioningText}>
        <Button onClick={() => undefined}>Hfasdasdfasdfasdffello</Button>
      </ButtonWithAccessory>
      <ButtonWithAccessory {...LEFT_POSITION_STYLE} label={leftPositioningText}>
        <Button onClick={() => undefined}>Hello</Button>
      </ButtonWithAccessory>
    </div>
  );
};
