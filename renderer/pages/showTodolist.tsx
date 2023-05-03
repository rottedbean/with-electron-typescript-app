import { useState, useEffect } from 'react';

import { getConfig } from '../../electron-src/Controller';
import { Todo } from '../interfaces/Todo'
import  TodoForm from '../components/Todocreate'
import Layout from '../components/Layout'

export default function ConfigPage() {
  //json 서버에 저장하는 방식이 되어야할듯 아니면 글렀다
  const [config, setConfig] = useState<Todo[]>(getConfig());
  const [isAdd,setisAdd] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    global.ipcRenderer.invoke('getMyData').then((content) => {
      setConfig(content);})
    global.ipcRenderer.send('makeWatch')
    global.ipcRenderer.on('changedText',(event,content)=> {
      setConfig(content)
    })
  }, []);

  const handleDelete = (id:string) => {
    global.ipcRenderer.send('formDelete', id)
  }

  return (
    <Layout title="List Example (as Function Component) | Next.js + TypeScript + Electron Example"> 
      <div>
      <ul>
        {config.map((todo) => (       
          
          <li key={todo.id}>
            {(selectedTodo != null) && (selectedTodo.id == todo.id) ?
             (<><button onClick={() => setSelectedTodo(null)}>close</button></>) :
            (<><h3>{todo.title}</h3>
            <p>{todo.text}</p>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
            <button onClick={() => setSelectedTodo(todo)}>detail</button></>)}   
            
          </li>
        ))}
      </ul>
      {isAdd ? <TodoForm> </TodoForm> : null}
      <button onClick={() => setisAdd(!isAdd)} disabled={isAdd}>Add Todo</button>
    </div> 
    </Layout>
    
  );
}
