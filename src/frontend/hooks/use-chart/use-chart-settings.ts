import { ChartSettings } from "@prisma/client";
import { useEffect, useState } from "react";

export interface Settings {
  actions: {
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
    showAlbums: boolean;
    showTitle: boolean;
    textColor: string;
  };
}

const useChartSettings = (defaultSettings: ChartSettings | null): Settings => {
  const [settings, setSettings] = useState<Settings['state']>({
    backgroundColor:  defaultSettings?.background_color ?? '',
    borderColor: defaultSettings?.border_color ?? '',
    borderSize: 1,
    showAlbums: defaultSettings?.show_albums ?? !false,
    showTitle: defaultSettings?.show_title ?? !false,
    textColor: defaultSettings?.text_color ?? '',
  });

  useEffect(() => {
    setSettings({
      backgroundColor:  defaultSettings?.background_color ?? '',
      borderColor: defaultSettings?.border_color ?? '',
      borderSize: 1,
      showAlbums: defaultSettings?.show_albums ?? false,
      showTitle: defaultSettings?.show_title ?? false,
      textColor: defaultSettings?.text_color ?? '',
    });
  }, [defaultSettings]);

  return {
    actions: {
      setBorderColor: (value: string) => setSettings((settings) => ({
        ...settings,
        borderColor: value,
      })),
      setBorderSize: (value: number) => setSettings((settings) => ({
        ...settings,
        borderSize: value,
      })),
      setShowAlbums: (value: boolean) => setSettings((settings) => ({
        ...settings,
        showAlbums: value,
      })),
      setBackgroundColor: (value: string) => setSettings((settings) => ({
        ...settings,
        backgroundColor: value,
      })),
      setShowTitle: (value: boolean) => setSettings((settings) => ({
        ...settings,
        showTitle: value,
      })),
      setTextColor: (value: string) => setSettings((settings) => ({
        ...settings,
        textColor: value,
      })),
    },
    state: settings,
  }
};

export default useChartSettings;
