import { usePillList } from "../../../../../frontend/hooks/springs/use-pill-list";
import ExpandingPill from "../../../../lib/ExpandingPill/ExpandingPill";
import Input from "../../../../lib/Input/Input";
import Select from "../../../../lib/Select/Select";

export interface Props {
  showTitle: boolean;
  setShowTitle: (value: boolean) => void;
  listAlbums: boolean;
  setListAlbums: (value: boolean) => void;
  borderColor: string;
  setBorderColor: (value: string) => void;
  borderSize: number;
  setBorderSize: (value: number) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  textColor: string;
  setTextColor: (value: string) => void;
}

const PageTwo: React.FC<Props> = ({
  showTitle,
  setShowTitle,
  listAlbums,
  setListAlbums,
  borderColor,
backgroundColor,
textColor,
setBorderColor,
setBackgroundColor,
setTextColor,
}) => {
  const labels = [
    'setBorderColor',
    'setBackgroundColor',
    'setTextColor',
  ];
  const setterFunctions = [
    setBorderColor,
    setBackgroundColor,
    setTextColor,
  ];
  const {
    onTypeForInputAtIndex,
    pillValues,
    toggleVisibilityOfInputAtIndex,
    visibilityMap,
  } = usePillList<string>({
    initialValues: [
      borderColor,
      backgroundColor,
      textColor,
    ],
    setterFunctions,
  });

  return (
    <>
    <div className="flex flex-row flex-wrap items-center ">
        {pillValues.map(((pill, index) => (
          <ExpandingPill
            className="m-1"
            isActive={visibilityMap[index] ?? false}
            key={index}
            toggleVisibility={() => toggleVisibilityOfInputAtIndex(index)}
          >
            <p className="text-lg">hello world</p>
            <button className=" text-lg">✏️</button>
            <Input
              className="w-full bg-neutral-100 "
              onChange={(event) => onTypeForInputAtIndex(event, 0)}
              placeholder="#adf2da"
              value={pill as string}
            />
          </ExpandingPill>
        )))}
      </div>
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
        value={showTitle ? 'yes' : 'no'}
        setChosenValue={(value) => setShowTitle(value === 'yes')}
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
        value={listAlbums ? 'yes' : 'no'}
        setChosenValue={(value) => setListAlbums(value === 'yes')}
        label="List albums?"
        placeholder="List albums?"
        isOpenByDefault={false}
      /> 
    </>
  );
};

export default PageTwo;