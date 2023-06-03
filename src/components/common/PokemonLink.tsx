import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { Pokemon } from '../../types/Pokemon';

type PokemonLinkProps = {
  id: Pokemon['id'];
  name: Pokemon['name'];
  children: ReactNode;
};

const PokemonLink = ({ id, name, children }: PokemonLinkProps) => {
  return (
    <Link component={RouterLink} underline="none" to={`/${name}/${id}`}>
      {children}
    </Link>
  );
};

export default PokemonLink;
