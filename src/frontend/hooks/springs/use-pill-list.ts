import { ChangeEvent, useState } from 'react';

export interface UsePillListState<T> {
  pillValues: T[];
  onTypeForInputAtIndex: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
  toggleVisibilityOfInputAtIndex: (index: number) => void;
  visibilityMap: boolean[];
}

export interface UsePillListProps<T> {
  initialValues: T[];
  initialVisibiltyMap?: boolean[];
}

export function usePillList<T>({
  initialValues = [],
  initialVisibiltyMap = initialValues.map(() => false),
}: UsePillListProps<T>) {
  const [pillValues, setPillValues] = useState<T[]>(initialValues);
  const [visibilityMap, setVisibilityMap] = useState<boolean[]>(initialVisibiltyMap);
 
  const toggleVisibilityOfInputAtIndex = (index: number) => {
    setVisibilityMap((oldVisibilityMap) => {
      const newVisibilityMap = [...oldVisibilityMap];
      newVisibilityMap[index] = !newVisibilityMap[index];
      if (!newVisibilityMap[index]) {
        setPillValues((oldPillValues) => {
          const newPillValues = [...oldPillValues];
          newPillValues[index] = initialValues[index] as T;
          return newPillValues;
        });
      }
      return newVisibilityMap;
    });
  }
  const onTypeForInputAtIndex = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    setPillValues((oldPillValues) => {
      const newPillValues = [...oldPillValues];
      newPillValues[index] = event.target.value as T;
      return newPillValues;
    });
  }

  return {
    onTypeForInputAtIndex,
    pillValues,
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  };
}
