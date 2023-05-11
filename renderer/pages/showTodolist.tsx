import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { Todo } from '../interfaces/Todo';
import TodoForm from '../components/TodoCreate';
import TodoUpdateForm from '../components/TodoUpdate';
import Layout from '../components/Layout';

export default function TodoPage() {
  const [isAdding, setisAdding] = useState(false);
  const [isUpdating, setisUpdating] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { mutate } = useSWRConfig();

  const { data, error } = useSWR('/api/formDataFetcher', async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = (id: string) => {
    global.ipcRenderer.send('formDelete', id);
    mutate('/api/formDataFetcher');
  };

  const handleUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setisUpdating(true);
  };

  return (
    <Layout title='List Example (as Function Component) | Next.js + TypeScript + Electron Example'>
      <div>
        <ul>
          {data.length === 0 && <p>woah</p>}
          {data.map((todo: Todo) => (
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
                  ></TodoUpdateForm>
                </>
              ) : selectedTodo != null && selectedTodo.id == todo.id ? (
                //상세보기의 경우
                <>
                  <button onClick={() => setSelectedTodo(null)}>close</button>
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                  <button onClick={() => handleUpdate(todo)}>update</button>
                </>
              ) : (
                //기본 경우
                <>
                  <h3>{todo.title}</h3>
                  <p>{todo.text}</p>
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
        <button onClick={() => setisAdding(true)} disabled={isAdding}>
          Add Todo
        </button>
      </div>
    </Layout>
  );
}
