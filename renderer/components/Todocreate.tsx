import { useState } from 'react';
import { Todo, State } from '../interfaces/Todo';
import { v4 as uuid } from 'uuid';
import { useSWRConfig } from 'swr';
//mui datepicker로 바꿀듯
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  children: React.ReactNode;
  setisAdding: (value: boolean) => void;
};

//todocreate와 todoupdate는 중복이 많음, 리팩토링 필요
function TodoForm({ children, setisAdding }: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState<State>('default');
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagvalue] = useState('');

  const { mutate } = useSWRConfig();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title,
      text,
      state,
      expire_date: expireDate,
      tag: tags,
    };
    global.ipcRenderer.send('formCreate', newTodo);
    setTitle('');
    setText('');
    setState('default');
    setExpireDate(null);
    setTags([]);
    mutate('/api/formDataFetcher');
    setisAdding(false);
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
    setTagvalue(event.target.value);
  };

  const handleTagAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //중복확인추가필요
    if (tagValue != '') {
      const newtag = tagValue.trim();
      setTags([...tags, newtag]);
      setTagvalue('');
    }
  };

  const handleTagDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    tagToDelete: string,
  ) => {
    event.preventDefault();
    setTags([...tags.filter((tags) => tags !== tagToDelete)]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type='text'
          value={title}
          onChange={handleTitleChange}
          required
        />
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
          <option value='default'>Default</option>
          <option value='done'>Done</option>
          <option value='expire'>Expire</option>
          <option value='periodical'>Periodical</option>
          <option value='pending'>Pending</option>
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
        <input type='text' value={tagValue} onChange={handleTagChange} />
        <button onClick={handleTagAdd}>add tag</button>
        {tags.map((tag, index) => (
          <div key={`tag-${index}`}>
            <p>{tag}</p>
            <button onClick={(e) => handleTagDelete(e, tag)}>x</button>
          </div>
        ))}
      </label>
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default TodoForm;
