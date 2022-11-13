import { ChartSettings } from "@prisma/client";
import { useState } from "react";

export interface Settings {
  backgroundColor: string;
  borderColor: string;
  borderSize: number;
  chartTitle: string;
  setBorderColor: (value: string) => void;
  setBorderSize: (value: number) => void;
  showAlbums: boolean;
  setShowAlbums: (value: boolean) => void;
  setBackgroundColor: (value: string) => void;
  setChartTitle: (value: string) => void;
  setShowTitle: (value: boolean) => void;
  setTextColor: (value: string) => void;
  showTitle: boolean;
  textColor: string;
}

const useChartSettings = (defaultSettings: ChartSettings | null): Settings => {
  const [backgroundColor, setBackgroundColor] = useState(
    defaultSettings?.background_color ?? ''
  );
  const [borderColor, setBorderColor] = useState(
    defaultSettings?.border_color ?? ''
  );
  const [borderSize, setBorderSize] = useState(1);
  const [showAlbums, setShowAlbums] = useState(
    defaultSettings?.show_albums ? defaultSettings?.show_albums : false
  );
  const [chartTitle, setChartTitle] = useState('');
  const [textColor, setTextColor] = useState(
    defaultSettings?.text_color ?? ''
  );
  const [showTitle, setShowTitle] = useState(
    defaultSettings?.show_title ?? false
  );

  return {
    chartTitle,
    setChartTitle,
    backgroundColor,
    setBackgroundColor,
    borderColor,
    setBorderColor,
    borderSize,
    setBorderSize,
    showAlbums,
    setShowAlbums,
    textColor,
    setTextColor,
    showTitle,
    setShowTitle,
  }
};

export default useChartSettings;
