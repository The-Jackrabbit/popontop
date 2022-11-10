import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpandingPill from './ExpandingPill';
import { usePillList } from '../../../frontend/hooks/springs/use-pill-list';
import NavDot, { Color } from '../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { Input } from '../Input/Input';
import RadioIcon from '../Radio/RadioIcon';
import { Radio } from '../Radio/Radio';

export default {
  args: {
    label: 'Border color'
  },
  title: 'lib/ExpandingPill',
  component: ExpandingPill,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ExpandingPill>;

export const TextInput: React.FC = ({}) => {
  const {
    onTypeForInputAtIndex,
    pillValues,
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  } = usePillList<string>({
    initialValues: ['hi'],
    setterFunctions: ['hi'].map(() => () => undefined),
  });
  return (
    <div className="m-4 max-w-[220px]">
      <ExpandingPill
        className=""
        isActive={visibilityMap[0] ?? false}
        toggleVisibility={() => toggleVisibilityOfInputAtIndex(0)}
      >
        <p className="text-lg">hello world</p>
        <button className=" text-lg">✏️</button>
        <Input
          className="w-full bg-neutral-100 "
          onChange={(event) => onTypeForInputAtIndex(event, 0)}
          placeholder="#adf2da"
          value={pillValues[0] as string}
        />
      </ExpandingPill>
    </div>
  )
}

export const SwitchInput: React.FC = () => {
  const {
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  } = usePillList<boolean>({
    initialValues: [false],
    setterFunctions: [false].map(() => () => undefined),
  });
  const [value, setValue] = useState<boolean | null>(null);
  return (
    <div className="m-4 max-w-[220px]">
      <ExpandingPill
        className=""
        isActive={visibilityMap[0] ?? true}
        toggleVisibility={() => toggleVisibilityOfInputAtIndex(0)}
      >
        <p className="text-lg">show title?</p>
        <div className="">
          <RadioIcon variant={value} />
        </div>
        <Radio 
          onClick={(value) => setValue(value)}
          value={Boolean(value)}
        />
      </ExpandingPill>
    </div>
  )
}

const INIT_FRUITS: string[] = [
  'peach',
  'plum',
  'pear',
  'grapes',
  'orange',
  'apple',
  'mango',
  'watermelon'
];

export const List: ComponentStory<typeof ExpandingPill> = () => {
  const {
    onTypeForInputAtIndex,
    pillValues,
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  } = usePillList<string>({
    initialValues: INIT_FRUITS,
    setterFunctions: INIT_FRUITS.map(() => () => undefined),
  });
  return (
    <div>
      <div className="gap-1 flex flex-row m-4 w-[300px] flex-wrap items-center ">
        {pillValues.map(((pill, index) => (
          <ExpandingPill
            className=""
            isActive={visibilityMap[index] ?? false}
            key={index}
            toggleVisibility={() => toggleVisibilityOfInputAtIndex(index)}
          >
            <p className="text-lg">hello world</p>
            <button className=" text-lg">✏️</button>
            <Input
              className="w-full bg-neutral-100 "
              onChange={(event) => onTypeForInputAtIndex(event, 0)}
              placeholder="#adf2da"
              value={pillValues[0] as string}
            />
          </ExpandingPill>
        )))}
      </div>
      <div>
        {INIT_FRUITS.map((fruitLabel, index) => (
          <p key={fruitLabel}>{fruitLabel}: {pillValues[index]}</p>
        ))}
      </div>
    </div>
  )
}
