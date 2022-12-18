import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpandingPill from './ExpandingPill';
import { usePillList } from '../../../frontend/hooks/springs/use-pill-list';
import { Input } from '../Input/Input';
import NumericExpandingPill from './NumericExpandingPill/NumericExpandingPill';
import TextExpandingPill from './TextExpandingPill/TextExpandingPill';
import SwitchExpandingPill from './SwitchExpandingPill/SwitchExpandingPill';

export default {
  args: {
    label: 'Border color',
  },
  title: 'lib/ExpandingPill',
  component: ExpandingPill,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ExpandingPill>;

export const TextInput: React.FC = ({}) => {
  const [value, setValue] = useState<string>('');
  return (
    <TextExpandingPill
      label="Background color"
      setValue={setValue}
      value={value}
    />
  );
};

export const SwitchInput: React.FC = () => {
  const [value, setValue] = useState<boolean | null>(null);
  return (
    <SwitchExpandingPill
      label="show title?"
      setValue={setValue}
      value={value}
    />
  );
};

export const NumericInput: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const min = 0;
  const max = 10;
  return (
    <NumericExpandingPill
      label="Border width"
      min={min}
      max={max}
      setValue={setValue}
      value={value}
    />
  );
};

const INIT_FRUITS: string[] = [
  'peach',
  'plum',
  'pear',
  'grapes',
  'orange',
  'apple',
  'mango',
  'watermelon',
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
      <div className="m-4 flex w-[300px] flex-row flex-wrap items-center gap-1 ">
        {pillValues.map((pill, index) => (
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
        ))}
      </div>
      <div>
        {INIT_FRUITS.map((fruitLabel, index) => (
          <p key={fruitLabel}>
            {fruitLabel}: {pillValues[index]}
          </p>
        ))}
      </div>
    </div>
  );
};
