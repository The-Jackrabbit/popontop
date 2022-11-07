import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ExpandingPill from './ExpandingPill';
import { usePillList } from '../../../frontend/hooks/springs/use-pill-list';

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

export const Single: ComponentStory<typeof ExpandingPill> = (args) => {

  return (
    <div className="m-4 max-w-[220px]">
      <ExpandingPill {...args}  />
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
            onChange={(event) => onTypeForInputAtIndex(event, index)}
            key={index}
            label={INIT_FRUITS[index] ?? ''}
            toggleVisibility={() => toggleVisibilityOfInputAtIndex(index)}
            value={pill as string}
          />
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
