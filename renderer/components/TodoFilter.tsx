import { Autocomplete, TextField, Button } from '@mui/material';
import { useState } from 'react';

import { Todo } from '../interfaces/Todo';

type Props = {
  todoData: any;
  handleSearch: (value: string) => void;
};

export default function TodoFilter({ todoData, handleSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <>
      <Autocomplete
        freeSolo
        disableClearable
        options={todoData.map((todo: Todo) => todo.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search input'
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleSearch(searchTerm)}
      >
        Search
      </Button>
    </>
  );
}
