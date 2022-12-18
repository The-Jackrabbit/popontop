import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavDot, { Color } from './NavDot';

export default {
  args: {
    className: '',
    color: Color.blue,
    label: 'Label',
  },
  title: 'app/SidebarNav/NavDot',
  component: NavDot,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof NavDot>;

export const Single: ComponentStory<typeof NavDot> = (args) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="m-[100px]">
      <NavDot
        {...args}
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
    </div>
  );
};

export const Multiple = () => {
  const [activeDot, setActiveDot] = useState(Color.amber);
  return (
    <>
      <div className="m-[100px] flex flex-row gap-4">
        {Object.values(Color).map((color, index) => (
          <NavDot
            ariaLabel=""
            key={index}
            color={color}
            isActive={color === activeDot}
            label={color}
            onClick={() => setActiveDot(color)}
          />
        ))}
      </div>
      <div className="m-[100px] flex flex-row gap-4">
        {Object.values(Color).map((color, index) => (
          <NavDot
            ariaLabel=""
            key={`static-${index}`}
            color={color}
            isActive={true}
            label={color}
            onClick={() => setActiveDot(color)}
          />
        ))}
      </div>
    </>
  );
};
