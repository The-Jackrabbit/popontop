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
  borderSize,
  setBorderSize,
}) => {
  return (
    <Slider
      min={0}
      max={10}
      onChange={(event) => setBorderSize(parseInt(event?.target.value))}
      label="Border size"
      value={borderSize.toString()}
    />
  );
};

export default PageThree;