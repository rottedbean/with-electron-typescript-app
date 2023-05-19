import { useState } from 'react';
import { Todo, State } from '../interfaces/Todo';
import { useSWRConfig } from 'swr';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  children: React.ReactNode;
  todoData: Todo;
  setisUpdating: (value: boolean) => void;
  setSelectedTodo: (value: Todo | null) => void;
};

function TodoUpdateForm({
  children,
  todoData,
  setisUpdating,
  setSelectedTodo,
}: Props) {
  const [title, setTitle] = useState(todoData.title);
  const [text, setText] = useState(todoData.text);
  const [state, setState] = useState<State>(todoData.state);
  const [expireDate, setExpireDate] = useState(todoData.expire_date);
  const [tags, setTags] = useState<string[]>(todoData.tag);
  const [tagValue, setTagvalue] = useState('');

  const { mutate } = useSWRConfig();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: todoData.id,
      title,
      text,
      state,
      expire_date: expireDate,
      tag: tags,
    };
    global.ipcRenderer.send('formUpdate', newTodo);
    mutate('/api/formDataFetcher');
    setisUpdating(false);
    setSelectedTodo(null);
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
    const formattedDate = dayjs(date).format('YYYY/MM/DD');
    setExpireDate(formattedDate);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={handleExpireDateChange}
            disabled={state !== 'expire'}
          />
        </LocalizationProvider>
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

export default TodoUpdateForm;
