import { ChartSettings } from '@prisma/client';
import { useState } from 'react';
import { HookNode } from '../../../types/singletons';
import { setThemeColorMetaTag } from '../../../server/utils/mobile-theme';
import { useIncrementer } from '../use-incrementer';

export type SettingsHookNode = HookNode<State, Actions>;

export interface Actions {
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  setAlbumOverlayColor: (value: string) => void;
  setBorderColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setShowAlbums: (value: boolean) => void;
  setBackgroundColor: (value: string) => void;
  setColumns: (value: number) => void;
  setNumberOfAlbums: (value: number) => void;
  setRows: (value: number) => void;
  setShowTitle: (value: boolean) => void;
  setTextColor: (value: string) => void;
  setTitleBackgroundColor: (value: string) => void;
}

export interface State {
  albumOverlayColor: string;
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  columns: number;
  numberOfAlbums: number;
  rows: number;
  showAlbums: boolean;
  showTitle: boolean;
  textColor: string;
  titleBackgroundColor: string;
}

const useChartSettings = (
  defaultSettings?: ChartSettings
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
  const [backgroundColor, _setBackgroundColor] = useState(
    defaultSettings?.background_color ?? ''
  );
  const setBackgroundColor = (color: string) => {
    setThemeColorMetaTag(color);
    _setBackgroundColor(color);
  };
  const [titleBackgroundColor, setTitleBackgroundColor] = useState(
    defaultSettings?.title_background_color ?? ''
  );
  const [borderColor, setBorderColor] = useState(
    defaultSettings?.border_color ?? ''
  );
  const [borderSize, setBorderSize] = useState(1); // need to convert the sql sschema for this value from a decimal to a regualr number before unhardcoding this
  const [numberOfAlbums, setNumberOfAlbums] = useState<number>(
    (defaultSettings && defaultSettings?.number_of_albums
      ? parseInt(defaultSettings?.number_of_albums as unknown as string)
      : 10) as number
  );
  const [showAlbums, setShowAlbums] = useState(
    defaultSettings?.show_albums ?? true
  );
  const [showTitle, setShowTitle] = useState(
    defaultSettings?.show_title ?? true
  );
  const [textColor, setTextColor] = useState(defaultSettings?.text_color ?? '');
  const [albumOverlayColor, setAlbumOverlayColor] = useState('');

  return {
    actions: {
      onDecrementColumns,
      onDecrementRows,
      onIncrementColumns,
      onIncrementRows,
      setAlbumOverlayColor,
      setBackgroundColor,
      setBorderColor,
      setBorderSize,
      setColumns,
      setNumberOfAlbums,
      setRows,
      setShowAlbums,
      setShowTitle,
      setTextColor,
      setTitleBackgroundColor,
    },
    state: {
      albumOverlayColor,
      backgroundColor,
      borderColor,
      borderSize,
      columns,
      numberOfAlbums,
      rows,
      showAlbums,
      showTitle,
      textColor,
      titleBackgroundColor,
    },
  };
};

export default useChartSettings;
