import { ChartSettings } from '@prisma/client';
import { useState } from 'react';
import { HookNode } from '../../../types/singletons';
import { useIncrementer } from '../use-incrementer';

export type SettingsHookNode = HookNode<State, Actions>;

export interface Actions {
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  setBorderColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setShowAlbums: (value: boolean) => void;
  setBackgroundColor: (value: string) => void;
  setColumns: (value: number) => void;
  setNumberOfAlbums: (value: number) => void;
  setRows: (value: number) => void;
  setShowTitle: (value: boolean) => void;
  setTextColor: (value: string) => void;
}

export interface State {
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  columns: number;
  numberOfAlbums: number;
  rows: number;
  showAlbums: boolean;
  showTitle: boolean;
  textColor: string;
}

const useChartSettings = (
  defaultSettings: ChartSettings | null
): SettingsHookNode => {
  const {
    onIncrement: onIncrementRows,
    onDecrement: onDecrementRows,
    setValue: setRows,
    value: rows,
  } = useIncrementer({
    initialAmount: 5, // TODO: persist to backend
    max: 18,
  });
  const {
    onIncrement: onIncrementColumns,
    onDecrement: onDecrementColumns,
    setValue: setColumns,
    value: columns,
  } = useIncrementer({
    initialAmount: 10, // TODO: persist to backend
    max: 18,
  });
  const [backgroundColor, setBackgroundColor] = useState(
    defaultSettings?.background_color ?? ''
  );
  const [borderColor, setBorderColor] = useState(
    defaultSettings?.border_color ?? ''
  );
  const [borderSize, setBorderSize] = useState(1); // need to convert the sql sschema for this value from a decimal to a regualr number before unhardcoding this
  const [numberOfAlbums, setNumberOfAlbums] = useState(
    (defaultSettings?.number_of_albums ?? 50) as number
  );
  const [showAlbums, setShowAlbums] = useState(
    defaultSettings?.show_albums ?? true
  );
  const [showTitle, setShowTitle] = useState(
    defaultSettings?.show_title ?? true
  );
  const [textColor, setTextColor] = useState(defaultSettings?.text_color ?? '');

  return {
    actions: {
      onDecrementColumns,
      onDecrementRows,
      onIncrementColumns,
      onIncrementRows,
      setBackgroundColor,
      setBorderColor,
      setBorderSize,
      setColumns,
      setNumberOfAlbums,
      setRows,
      setShowAlbums,
      setShowTitle,
      setTextColor,
    },
    state: {
      backgroundColor,
      borderColor,
      borderSize,
      columns,
      numberOfAlbums,
      rows,
      showAlbums,
      showTitle,
      textColor,
    },
  };
};

export default useChartSettings;
