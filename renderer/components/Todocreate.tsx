import { useState, } from 'react';
import { Todo, Tag, State } from '../interfaces/Todo'
import { v4 as uuid } from 'uuid';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  children: any
}

function TodoForm(children:Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState<State>('default');
  const [expireDate, setExpireDate] = useState<Date|null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo:Todo = {
      id: uuid(),
      title,
      text,
      state,
      expire_date: expireDate,
      tag: tags
    };
    global.ipcRenderer.send('formUp', newTodo)
    setTitle('');
    setText('');
    setState('default');
    setExpireDate(null);
    setTags([]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value as State);
  };

  const handleExpireDateChange = (date: Date | null) => {
    setExpireDate(date);
  };

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTag:Tag = { name: event.target.value.trim() };
    if (newTag.name !== '') {
      setTags((prevState) => [...prevState, newTag]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} required />
      </label>
      <br />
      <label>
        Text:
        <textarea value={text} onChange={handleTextChange} required />
      </label>
      <br />
      <label>
        State:
        <select value={state} onChange={handleStateChange}>
          <option value="default">Default</option>
          <option value="done">Done</option>
          <option value="expire">Expire</option>
          <option value="periodical">Periodical</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <br />
      <label>
        Expire Date:
        <br />
        <DatePicker
          selected={expireDate}
          onChange={handleExpireDateChange}
          disabled={state !== 'expire'}
        />      
      </label>
      <br />
      <label>
        Tag:
        <input type="text" onChange={handleTagChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TodoForm