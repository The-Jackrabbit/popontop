import Select from "../../../../lib/Select/Select";
import Slider from "../../../../lib/Slider/Slider";

export interface Props {
  showTitle: boolean;
  setShowTitle: (value: boolean) => void;
  listAlbums: boolean;
  setListAlbums: (value: boolean) => void;
}

const PageTwo: React.FC<Props> = ({
  showTitle,
  setShowTitle,
  listAlbums,
  setListAlbums,
}) => {
  return (
    <>
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