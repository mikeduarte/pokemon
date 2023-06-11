import { DebounceInput } from 'react-debounce-input';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Filters } from './types/Filters';

type SearchTextFieldProps = {
  debounceTimeout?: number;
  onChange: (filter: { searchTerm: Filters['searchTerm'] }) => void;
  label: string;
  placeholder?: string;
  size?: TextFieldProps['size'];
};

const SearchTextField = ({
  debounceTimeout = 1000,
  onChange,
  label,
  placeholder,
  size = 'small',
}: SearchTextFieldProps) => {
  return (
    <DebounceInput
      data-testid={`search-text-field-${label}`}
      size={size}
      fullWidth
      placeholder={placeholder}
      inputProps={{
        'aria-label': label,
      }}
      element={TextField}
      debounceTimeout={debounceTimeout}
      onChange={(event) => onChange({ searchTerm: event.target.value })}
      onKeyDown={(e) => {
        if (!/[A-Za-z]/.test(e.key)) {
          e.preventDefault();
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchTextField;
