import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Filters } from './types/Filters';

type TabViewButtonsProps = {
  tabView: Filters['tabView'];
  onChange: (filter: { tabView: Filters['tabView'] }) => void;
};

const TabViewButtons = ({ tabView, onChange }: TabViewButtonsProps) => {
  const handleTabViewChange = (value: Filters['tabView']) => {
    if (value !== null) {
      onChange({ tabView: value });
    }
  };

  return (
    <ToggleButtonGroup
      data-testid="tab-view-buttons"
      size="small"
      color="primary"
      value={tabView}
      exclusive
      fullWidth
      onChange={(_event, value: Filters['tabView']) => handleTabViewChange(value)}
      aria-label="Tab View"
    >
      <ToggleButton value="all" sx={{ fontWeight: 'bold' }}>
        All
      </ToggleButton>
      <ToggleButton value="favorites" sx={{ fontWeight: 'bold' }}>
        Favorites
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TabViewButtons;
