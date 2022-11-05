import Input from "../../../../lib/Input/Input";
import Slider from "../../../../lib/Slider/Slider";

export interface Props {
  borderColor: string;
  setBorderColor: (value: string) => void;
  borderSize: number;
  setBorderSize: (value: number) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
}

const PageThree: React.FC<Props> = ({
  borderColor,
  setBorderColor,
  borderSize,
  setBorderSize,
  backgroundColor,
  setBackgroundColor,
  textColor,
  setTextColor,
}) => {
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
        onChange={(event) => setBorderSize(parseInt(event?.target.value))}
        label="Border size"
        value={borderSize.toString()}
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