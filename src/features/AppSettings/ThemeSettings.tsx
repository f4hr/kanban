import React from 'react';

import './AppSettings.css';
// Hooks
import { useTheme } from '../../hooks';
// Components
import { RadioGroup } from '../../components';

interface ThemeSettingsProps {
  id: string;
  className?: string;
}

export function ThemeSettings({ id, className }: ThemeSettingsProps) {
  const { mode, getModes, setThemeMode } = useTheme();
  const modes = getModes();

  return (
    <RadioGroup
      className={className}
      defaultValue={mode}
      aria-label="Theme mode"
      onValueChange={(value: typeof mode) => setThemeMode(value)}
    >
      {modes.map((themeMode) => (
        <RadioGroup.Item
          key={themeMode}
          id={`${id}-${themeMode}`}
          value={themeMode}
          label={themeMode}
        >
          <RadioGroup.Indicator />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}

ThemeSettings.defaultProps = {
  className: undefined,
};
