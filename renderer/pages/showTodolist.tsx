import { useState} from 'react';
import useSWR , { useSWRConfig } from 'swr'

import { Todo } from '../interfaces/Todo'
import TodoForm from '../components/Todocreate'
import Layout from '../components/Layout'

export default function TodoPage() {
  const [isAdd,setisAdd] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { mutate } = useSWRConfig();

  const { data, error } = useSWR('/api/formDataFetcher', async (url) => {
    const res = await fetch(url);
    return res.json();});

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = (id:string) => {
    global.ipcRenderer.send('formDelete', id);
    mutate('/api/formDataFetcher');
  }

  return (
    <Layout title="List Example (as Function Component) | Next.js + TypeScript + Electron Example"> 
      <div>
      <ul>
        {data.length === 0 && <p>woah</p> }
        {data.map((todo) => (       
          
          <li key={todo.id}>
            {(selectedTodo != null) && (selectedTodo.id == todo.id) ?
            //상세보기의 경우
             (<><button onClick={() => setSelectedTodo(null)}>close</button></>) :
            //기본 경우
            (<><h3>{todo.title}</h3>
            <p>{todo.text}</p>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
            <button onClick={() => setSelectedTodo(todo)}>detail</button></>)}   
            
          </li>
        ))}
      </ul>
      {isAdd ? (<><TodoForm> </TodoForm> <button onClick={() => setisAdd(!isAdd)}>close</button></>) : null}
      <button onClick={() => setisAdd(!isAdd)} disabled={isAdd}>Add Todo</button>
    </div> 
    </Layout>
    
  );
}