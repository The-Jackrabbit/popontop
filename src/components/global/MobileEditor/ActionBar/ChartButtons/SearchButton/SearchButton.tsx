import { PlusIcon } from "@heroicons/react/20/solid";
import FilterButton, { ICON_STYLE } from "../../../../../lib/FilterButton/FilterButton";

export interface Props {
  onClick: () => void;
}

export const SearchButton: React.FC<Props> = ({ onClick }) => (
  <FilterButton
    ariaLabel="search albums"
    onClick={onClick}
    hasGradientIndicator={false}
  >
    <PlusIcon className={ICON_STYLE} />
  </FilterButton>
);

export default SearchButton;
