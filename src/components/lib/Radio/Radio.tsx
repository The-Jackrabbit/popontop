import { Color } from '../../global/DesktopEditor/Sidebar/SidebarNav/NavDot/NavDot';
import { RadioOption } from './RadioOption/RadioOption';

export interface Props {
  onClick: (value: boolean) => void;
  value: boolean;
}

export const Radio: React.FC<Props> = ({ onClick, value }) => {
  return (
    <div className="flex h-12 w-full justify-between">
      <RadioOption
        color={Color.rose}
        isActive={!value}
        label="no"
        onClick={() => onClick(false)}
      />
      <p
        className='
          text-[rgb(212_212_212)]
          text-[48px] translate-y-1 dark:text-neutral-900
        '
      >
        /
      </p>
      <RadioOption
        color={Color.green}
        isActive={value}
        label="yes"
        onClick={() => onClick(true)}
      />
    </div>
  );
};

export default Radio;
