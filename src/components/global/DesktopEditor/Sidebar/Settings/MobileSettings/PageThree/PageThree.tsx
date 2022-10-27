
import { useState } from "react";
import Input from "../../../../../../lib/Input/Input";
import Slider from "../../../../../../lib/Slider/Slider";

const PageThree: React.FC = () => {
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

export default PageThree;