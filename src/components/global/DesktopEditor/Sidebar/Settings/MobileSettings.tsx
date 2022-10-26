import { useState } from "react";
import Select from "../../../../lib/Select/Select";
import Slider from "../../../../lib/Slider/Slider";
import Input from "../../../../lib/Input/Input";
import HorizontalSwipe from "../../../../lib/HorizontalSwipe/HorizontalSwipe";
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

export const MobileSettings: React.FC = () => {
  return (
    <div className="p-3">
      <HorizontalSwipe>
        <div className="p-8"><SettingsPageZero /></div>
        <div className="p-8"><SettingsPageOne /></div>
        <div className="p-8"><SettingsPageTwo /></div>
      </HorizontalSwipe>
    </div>
  )
}
const DynamicDownLoadButton = dynamic(() => import('./DownloadButton'), {
  ssr: false,
})

const SettingsPageZero: React.FC = () => {
  return (
    <>
      <Suspense fallback={<p>Download</p>}>
        <DynamicDownLoadButton />
 
      </Suspense>
      <div id="chartPreview" className="bg-rose-500 w-full mt-12 h-full">

      </div>
    </>
  );
};

const SettingsPageOne: React.FC = () => {
  const [chartType, setChartType] = useState('');  
  const [showTitle, setShowTitle] = useState('');
  const [listAlbums, setListAlbums] = useState('');
  const [albumPadding, setAlbumPadding] = useState('');

  return (
    <>
      <Select
        options={[
          {
            label: 'Top 100',
            value: 'top-100',
          },
          {
            label: 'Top 50',
            value: 'top-50',
          },
          {
            label: 'Grid',
            value: 'grid',
          },
        ]}
        value={chartType}
        setChosenValue={(val) => setChartType(val)}
        label="Chart type"
        placeholder="Chart type"
        isOpenByDefault={false}
      />
    
      <Select
        options={[
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
        ]}
        value={showTitle}
        setChosenValue={(value) => setShowTitle(value)}
        label="Show title?"
        placeholder="Show title?"
        isOpenByDefault={false}
      />

      <Select
        options={[
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
        ]}
        value={listAlbums}
        setChosenValue={(value) => setListAlbums(value)}
        label="List albums?"
        placeholder="List albums?"
        isOpenByDefault={false}
      /> 
    
      <Slider
        min={0}
        max={10}
        onChange={(event) => setAlbumPadding(event.target.value)}
        label="Album padding"
        value={albumPadding}
      />      
    </>
  );
};

const SettingsPageTwo: React.FC = () => {
  const [borderColor, setBorderColor] = useState('');
  const [borderSize, setBorderSize] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');

  return (
    <>
      <Input
        label={'Border color'}
        onChange={(event) => setBorderColor(event.target.value)}
        placeholder="#adf2da"
        value={borderColor}
      />
    
      <Slider
        min={0}
        max={10}
        onChange={(event) => setBorderSize(event?.target.value)}
        label="Border size"
        value={borderSize}
      />   
    
      <Input
        label="Background color"
        onChange={(event) => setBackgroundColor(event?.target.value)}
        placeholder="#adf2da"
        value={backgroundColor}
      />
    
      <Input
        label="Text color"
        onChange={(event) => setTextColor(event?.target.value)}
        placeholder="#adf2da"
        value={textColor}
      />
    </>
  );
};


export default MobileSettings;