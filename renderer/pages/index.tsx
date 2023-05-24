import { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Autocomplete, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Todo } from '../interfaces/Todo';
import TodoForm from '../components/TodoCreate';
import TodoUpdateForm from '../components/TodoUpdate';
import Layout from '../components/Layout';

export default function TodoPage() {
  const { data, error } = useSWR(
    '/api/formDataFetcher',
    async (url) => {
      const res = await fetch(url);
      return res.json();
    },
    {
      fallbackData: [],
    },
  );

  const [isAdding, setisAdding] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [sortedList, setSortedList] = useState(data);
  const [sortKey, setSortKey] = useState('none');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data) {
      setSortedList(data);
    }
  }, [data]);

  const { mutate } = useSWRConfig();

  const handleSort = (key: string) => {
    const sorted = [...sortedList].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setSortedList(sorted);
    setSortKey(key);
  };

  //검색기능이란게 필요한가....
  const handleSearch = (term: string) => {
    console.log(term);
  };

  const handleDelete = (id: string) => {
    //dialog로 선택문 표시해야하는게?
    global.ipcRenderer.send('formDelete', id);
    mutate('/api/formDataFetcher');
  };

  const handleUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setisUpdating(true);
  };

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout title='List Example (as Function Component) | Next.js + TypeScript + Electron Example'>
      <div>
        <Autocomplete
          freeSolo
          disableClearable
          options={data.map((todo: Todo) => todo.title)}
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
        <div>
          <button onClick={() => handleSort('title')}>Sort by Title</button>
          <button onClick={() => handleSort('state')}>Sort by State</button>
          <button onClick={() => handleSort('expire_date')}>
            Sort by Date
          </button>
        </div>
        <ul>
          {sortedList.length === 0 && <p>woah</p>}
          {sortedList.map((todo: Todo) => (
            <li key={todo.id}>
              {isUpdating &&
              selectedTodo != null &&
              selectedTodo.id == todo.id ? (
                //업데이트하는 경우
                <>
                  <TodoUpdateForm
                    todoData={todo}
                    setisUpdating={setisUpdating}
                    setSelectedTodo={setSelectedTodo}
                    children={undefined}
                  ></TodoUpdateForm>{' '}
                  <button
                    onClick={() => {
                      setisUpdating(false);
                      setSelectedTodo(null);
                    }}
                  >
                    close
                  </button>
                </>
              ) : selectedTodo != null && selectedTodo.id == todo.id ? (
                //상세보기의 경우
                <>
                  <p>detail page</p>
                  <p>{todo.expire_date}</p>
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                  <button onClick={() => setSelectedTodo(null)}>close</button>
                </>
              ) : (
                //기본 경우
                <>
                  <h3>{todo.title}</h3>
                  <p>{todo.text}</p>
                  {todo.tag.map((tag, index) => (
                    <div key={`tag-${index}`}>
                      <p>{tag}</p>
                    </div>
                  ))}
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                  <button onClick={() => setSelectedTodo(todo)}>detail</button>
                </>
              )}
            </li>
          ))}
        </ul>
        {isAdding ? (
          <>
            <TodoForm setisAdding={setisAdding}> </TodoForm>{' '}
            <button onClick={() => setisAdding(false)}>close</button>
          </>
        ) : null}
        <Button onClick={() => setisAdding(true)} disabled={isAdding}>
          <AddIcon></AddIcon>
        </Button>
        <p>now sorted by {sortKey}</p>
      </div>
    </Layout>
  );
}
