import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Layout from 'components/Layout';
import { Todo } from 'interfaces/Todo';
import TodoForm from 'components/TodoCreate';
import TodoUpdateForm from 'components/TodoUpdate';
import ViewDefault from 'components/ViewDefault';
import ViewDetail from 'components/ViewDetail';
import TodoFilter from 'components/TodoFilter';
import DeleteDialog from 'components/TodoDeleteDialog';

import { useDataFetcher } from '../utils/dataFetcher';

export default function TodoPage() {
  //서버로부터 데이터 패칭
  const { data, mutate } = useDataFetcher();

  const [isAdding, setisAdding] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const [sortedList, setSortedList] = useState(data);
  const [sortKey, setSortKey] = useState('none');

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

  const handleDelete = (id: string) => {
    setIdToDelete(id);
    setOpenDialog(true);
  };

  const handleUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setisUpdating(true);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <Layout title='Next.js + TypeScript + Electron Example'>
      <div>
        <TodoFilter todoData={data} handleSearch={handleSearch} />
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
          </>
        ) : (
          <Button onClick={() => setisAdding(true)}>
            <AddIcon />
          </Button>
        )}
        <p>now sorted by {sortKey}</p>
      </div>
      {openDialog && (
        <DeleteDialog
          openDialog={openDialog}
          idToDelete={idToDelete}
          setOpenDialog={setOpenDialog}
          handleRefresh={handleRefresh}
        />
      )}
    </Layout>
  );
}
