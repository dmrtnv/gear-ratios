import { useAppSelector } from '@/hooks/redux';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DrivetrainSelectGroupContext = {
  selectedDrivetrainId: string | null;
  setSelectedDrivetrainId: (id: string) => void;
};

const DrivetrainSelectGroupContext = createContext<DrivetrainSelectGroupContext | null>(null);

export function DrivetrainSelectGroupProvider({ children }: { children: React.ReactNode }) {
  const drivetrains = useAppSelector((state) => state.drivetrain.drivetrains);
  const [selectedDrivetrainId, setSelectedDrivetrainId] = useState<string | null>(null);

  useEffect(() => {
    if (drivetrains.find((d) => d.id === selectedDrivetrainId) || !drivetrains.length) return;

    setSelectedDrivetrainId(drivetrains[0].id);
  }, [drivetrains, selectedDrivetrainId]);

  return (
    <DrivetrainSelectGroupContext.Provider value={{ selectedDrivetrainId, setSelectedDrivetrainId }}>
      {children}
    </DrivetrainSelectGroupContext.Provider>
  );
}

export function useDrivetrainSelectGroupContext() {
  const context = useContext(DrivetrainSelectGroupContext);

  if (!context) throw new Error('useDrivetrainSelectGroupContext must be used within DrivetrainSelectGroupProvider');

  return context;
}
