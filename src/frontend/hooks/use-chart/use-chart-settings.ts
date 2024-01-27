import { ChartSettings } from '@prisma/client';
import { useState } from 'react';
import { HookNode } from '../../../types/singletons';
import { setThemeColorMetaTag } from '../../../server/utils/mobile-theme';
import { useIncrementer } from '../use-incrementer';
import { ChartFormatKey } from '../../../components/global/Desktop/DesktopPreview/DesktopPreview';

export type SettingsHookNode = HookNode<State, Actions>;

export interface Actions {
  onDecrementColumns: () => void;
  onIncrementColumns: () => void;
  onDecrementRows: () => void;
  onIncrementRows: () => void;
  setAlbumOverlayColor: (value: string) => void;
  setBorderColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  setShowEntries: (value: boolean) => void;
  setBackgroundColor: (value: string) => void;
  setChartFormat: (value: ChartFormatKey) => void;
  setColumns: (value: number) => void;
  setNumberOfEntries: (value: number) => void;
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
  chartFormat: ChartFormatKey;
  columns: number;
  numberOfEntries: number;
  rows: number;
  showEntries: boolean;
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
  const [chartFormat, setChartFormat] = useState<ChartFormatKey>(
    (defaultSettings?.chart_format as ChartFormatKey)
      ? (defaultSettings?.chart_format as ChartFormatKey)
      : 'honeycomb10'
  );
  const [borderColor, setBorderColor] = useState(
    defaultSettings?.border_color ?? ''
  );
  const [borderSize, setBorderSize] = useState(1); // need to convert the sql sschema for this value from a decimal to a regualr number before unhardcoding this
  const [numberOfEntries, setNumberOfEntries] = useState<number>(
    (defaultSettings && defaultSettings?.number_of_albums
      ? parseInt(defaultSettings?.number_of_albums as unknown as string)
      : 10) as number
  );
  const [showEntries, setShowEntries] = useState(
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
      setChartFormat,
      setColumns,
      setNumberOfEntries,
      setRows,
      setShowEntries,
      setShowTitle,
      setTextColor,
      setTitleBackgroundColor,
    },
    state: {
      albumOverlayColor,
      backgroundColor,
      borderColor,
      borderSize,
      chartFormat,
      columns,
      numberOfEntries,
      rows,
      showEntries,
      showTitle,
      textColor,
      titleBackgroundColor,
    },
  };
};

export default useChartSettings;
