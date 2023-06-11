import { Autocomplete, TextField } from '@mui/material';
import { useGetPokemonTypes } from '../api/hooks';
import { Filters } from './types/Filters';

type TypeSelectProps = {
  onChange: (filter: { selectedType: Filters['selectedType'] }) => void;
  //selectedType: Filters['selectedType'];
};

const TypeSelect = ({ onChange }: TypeSelectProps) => {
  const { data, isLoading, isError } = useGetPokemonTypes();

  const pokemonTypes = data?.map((type) => {
    return {
      value: type,
      label: type,
    };
  });

  return (
    <Autocomplete
      data-testid="type-select"
      size="small"
      disablePortal
      blurOnSelect
      fullWidth
      options={pokemonTypes ?? []}
      loading={isLoading || isError}
      loadingText={isError ? 'Error...' : 'Loading...'}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(_event, option) => onChange({ selectedType: option?.value ?? '' })}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />
  );
};

export default TypeSelect;
