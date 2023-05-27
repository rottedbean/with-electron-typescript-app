import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Todo } from '../interfaces/Todo';
import TodoForm from '../components/TodoCreate';
import TodoUpdateForm from '../components/TodoUpdate';
import ViewDefault from '../components/ViewDefault';
import ViewDetail from '../components/ViewDetail';
import Layout from '../components/Layout';

import { useDataFetcher } from '../utils/dataFetcher';

export default function TodoPage() {
  //서버로부터 데이터 패칭
  const { data, mutate } = useDataFetcher();

  const [isAdding, setisAdding] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortedList, setSortedList] = useState(data);
  const [sortKey, setSortKey] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');

  //정렬리스트 초기값으로 원본 데이터 설정
  useEffect(() => {
    if (data) {
      setSortedList(data);
    }
  }, [data]);

  //입력받는 키값을 기반으로 정렬, 문자열인 경우만 가능
  const handleSort = (key: string) => {
    const sorted = [...sortedList].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setSortKey(key);
    setSortedList(sorted);
  };

  const handleRefresh = async () => {
    await mutate();
  };

  //검색기능이란게 필요한가....
  const handleSearch = (term: string) => {
    console.log(term);
  };

  const handleDelete = async (id: string) => {
    //dialog로 선택문 표시해야하는게?
    global.ipcRenderer.invoke('formDelete', id);
    global.ipcRenderer.on('deleteComplete', () => {
      handleRefresh();
    });
  };

  const handleUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setisUpdating(true);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <Layout title='Next.js + TypeScript + Electron Example'>
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
          {sortedList.length === 0 && <p>there is no todo yet</p>}

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
                    handleRefresh={handleRefresh}
                  />{' '}
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
                  <ViewDetail todoData={todo} />
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                  <button onClick={() => setSelectedTodo(null)}>close</button>
                </>
              ) : (
                //기본 경우
                <>
                  <ViewDefault todoData={todo} />
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
            <TodoForm setisAdding={setisAdding} handleRefresh={handleRefresh} />{' '}
            <button onClick={() => setisAdding(false)}>close</button>
          </>
        ) : null}
        <Button onClick={() => setisAdding(true)} disabled={isAdding}>
          <AddIcon />
        </Button>
        <p>now sorted by {sortKey}</p>
      </div>
    </Layout>
  );
}
