import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Filters } from './types/Filters';

type LayoutViewButtonsProps = {
  onChange: (filter: { layout: Filters['layout'] }) => void;
  layout: Filters['layout'];
};

const LayoutViewButtons = ({ layout, onChange }: LayoutViewButtonsProps) => {
  const handleLayoutViewChange = (value: Filters['layout']) => {
    if (value !== null) {
      onChange({ layout: value });
    }
  };

  return (
    <ToggleButtonGroup
      data-testid="layout-view-buttons"
      size="small"
      color="primary"
      exclusive
      value={layout}
      onChange={(_event, value: Filters['layout']) => handleLayoutViewChange(value)}
      aria-label="Layout View"
    >
      <ToggleButton value="grid" aria-label="Grid View">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="List View">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LayoutViewButtons;
