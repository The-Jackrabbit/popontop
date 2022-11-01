import { useState } from "react";
import Select from "../../../../lib/Select/Select";
import Slider from "../../../../lib/Slider/Slider";

const PageTwo: React.FC = () => {
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

export default PageTwo;