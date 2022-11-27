import { a, useSpring, config } from "react-spring";
import LogoButton from "./LogoButton/LogoButton";
import ActionOverlayLayout from "./ActionOverlay/ActionOverlayLayout";

export interface Props {
  actionOverlay: React.ReactNode;
  actionOverlayClassName?: string;
  className?: string;
  isActive: boolean;
  leftBadgeButton?: React.ReactNode;
  leftCornerButton?: React.ReactNode;
  rightBadgeButton?: React.ReactNode;
  rightCornerButton?: React.ReactNode;
  setIsActive: (val: boolean) =>  void;
}

export const ActionBarLayout: React.FC<Props> = ({
  actionOverlay,
  actionOverlayClassName,
  className = '',
  isActive,
  leftBadgeButton,
  leftCornerButton,
  rightBadgeButton,
  rightCornerButton,
  setIsActive,
}) => { 
  const [actionOverlayOpacity, animateActionOverlayOpacity] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  }));

  const [overlayPosition, animateOverlayPosition] = useSpring(() => ({
    transform: 'translateY(0vh)',
    config: config.stiff
  }));

  const start = () => {
    animateOverlayPosition.start({ transform: 'translateY(-100vh)' });
    animateActionOverlayOpacity.start({ opacity: 0 });
    setIsActive(false);
  };

  const end = () => {
    animateOverlayPosition.start({ transform:  'translateY(0vh)' });
    animateActionOverlayOpacity.start({ opacity: 1 });
  };

  const onExitActionOverlay = (event: React.BaseSyntheticEvent<MouseEvent>) => {
    event.stopPropagation()
    end();
  };

  return (
    <>
      <a.div
        className={`
          fixed bottom-0 left-0
          p-4
          w-[calc(100vw)]
          flex flex-row justify-between items-center
          ${className}
        `}
        style={{...actionOverlayOpacity}}
      >
        {leftCornerButton ? leftCornerButton : <div className="w-8 h-8" />}
        <div className="flex gap-2">
          {leftBadgeButton ? leftBadgeButton : <div className="w-8 h-8" />}
          <LogoButton end={end} isActive={isActive} start={start} />
          {rightBadgeButton ? rightBadgeButton : <div className="w-8 h-8" />}
        </div>
        {rightCornerButton ? rightCornerButton : <div className="w-8 h-8" />}
      </a.div>
      <a.div
        className="fixed left-0 bottom-0 z-50"
        style={{ ...overlayPosition }}
      >
        <ActionOverlayLayout
          onExit={onExitActionOverlay}
          className={actionOverlayClassName}
        >
          {actionOverlay}
        </ActionOverlayLayout>
      </a.div>
    </>
  );
};

export default ActionBarLayout;
