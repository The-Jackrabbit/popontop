import React from 'react';

interface Props {
  bottomSection: React.ReactNode;
  topSection: React.ReactNode;
}

export const DesktopActions: React.FC<Props> = ({
  bottomSection,
  topSection,
}) => (
  <div className="flex h-full flex-col justify-between">
    <div className=" flex flex-col gap-y-4">{topSection}</div>
    {bottomSection}
  </div>
);
