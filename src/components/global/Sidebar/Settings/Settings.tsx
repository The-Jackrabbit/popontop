import { useState } from "react";
import Select from "../../../../components/lib/Select/Select";
import Slider from "../../../../components/lib/Slider/Slider";
import Input from "../../../../components/lib/Input/Input";

const Settings: React.FC = () => {
  const [search, setSearch] = useState('');
  const [chartType, setChartType] = useState('');  
  const [showTitle, setShowTitle] = useState('');
  const [listAlbums, setListAlbums] = useState('');
  const [albumPadding, setAlbumPadding] = useState('');
  const [borderColor, setBorderColor] = useState('');
  const [borderSize, setBorderSize] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');

  return (
    <>
      <div>
        {/* <Input
          label="Search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search albums..."
          value={search}
        /> */}
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <Slider
          min={0}
          max={10}
          onChange={(event) => setAlbumPadding(event.target.value)}
          label="Album padding"
          value={albumPadding}
        />
      </div>
      <div>
        <Input
          label={'Border color'}
          onChange={(event) => setBorderColor(event.target.value)}
          placeholder="#adf2da"
          value={borderColor}
        />
      </div>
      <div>
        <Slider
          min={0}
          max={10}
          onChange={(event) => setBorderSize(event?.target.value)}
          label="Border size"
          value={borderSize}
        />
      </div>
      <div>
        <Input
          label="Background color"
          onChange={(event) => setBackgroundColor(event?.target.value)}
          placeholder="#adf2da"
          value={backgroundColor}
        />
      </div>
      <div>
        <Input
          label="Text color"
          onChange={(event) => setTextColor(event?.target.value)}
          placeholder="#adf2da"
          value={textColor}
        />
      </div>
    </>
  );
};

export default Settings;
