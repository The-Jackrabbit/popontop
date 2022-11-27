import { ChartSettings } from "@prisma/client";
import { useEffect, useState } from "react";
import { useIncrementer } from "../../../components/lib/NumberInput/NumberInput";

export interface Settings {
  actions: {
    onDecrementColumns: () => void;
    onIncrementColumns: () => void;
    onDecrementRows: () => void;
    onIncrementRows: () => void;
    setBorderColor: (value: string) => void;
    setBorderSize: (value: number) => void;
    setShowAlbums: (value: boolean) => void;
    setBackgroundColor: (value: string) => void;
    setShowTitle: (value: boolean) => void;
    setTextColor: (value: string) => void;
  };
  state: {
    backgroundColor: string;
    borderColor: string;
    borderSize: number;
    columns: number;
    rows: number;
    showAlbums: boolean;
    showTitle: boolean;
    textColor: string;
  };
}

const useChartSettings = (defaultSettings: ChartSettings | null): Settings => {
  const [rows, onIncrementRows, onDecrementRows] = useIncrementer({
    initialAmount: 5, // TODO: persist to backend
    max: 18
  });
  const [columns, onIncrementColumns, onDecrementColumns] = useIncrementer({
    initialAmount: 2, // TODO: persist to backend
  }); 
  const [backgroundColor, setBackgroundColor] = useState(defaultSettings?.background_color ?? '');
  const [borderColor, setBorderColor] = useState(defaultSettings?.border_color ?? '');
  const [borderSize, setBorderSize] = useState(1); // need to convert the sql sschema for this value from a decimal to a regualr number before unhardcoding this
  const [showAlbums, setShowAlbums] = useState(defaultSettings?.show_albums ?? true);
  const [showTitle, setShowTitle] = useState(defaultSettings?.show_title ?? true);
  const [textColor, setTextColor] = useState(defaultSettings?.text_color ?? '');

  useEffect(() => {
    setBackgroundColor(defaultSettings?.background_color ?? '');
    setBorderColor( defaultSettings?.border_color ?? '');
    setBorderSize( 1);
    setShowAlbums( defaultSettings?.show_albums ?? !false);
    setShowTitle( defaultSettings?.show_title ?? !false);
    setTextColor( defaultSettings?.text_color ?? '');
  }, [defaultSettings]);

  return {
    actions: {
      onDecrementColumns,
      onDecrementRows,
      onIncrementColumns,
      onIncrementRows,
      setBackgroundColor,
      setBorderColor,
      setBorderSize,
      setShowAlbums,
      setShowTitle,
      setTextColor,
    },
    state: {
      backgroundColor,
      borderColor,
      borderSize,
      columns,
      rows,
      showAlbums,
      showTitle,
      textColor ,
    }
  }
};

export default useChartSettings;
