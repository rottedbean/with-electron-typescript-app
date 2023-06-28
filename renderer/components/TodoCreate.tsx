import { useState } from 'react';
import { Todo, State } from '../interfaces/Todo';
import { v4 as uuid } from 'uuid';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
  setisAdding: (value: boolean) => void;
  handleRefresh: () => void;
};

function TodoForm({ setisAdding, handleRefresh }: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [state, setState] = useState<State>('default');
  const [expireDate, setExpireDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagvalue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title,
      text,
      state,
      expire_date: expireDate,
      tag: tags,
    };
    setTitle('');
    setText('');
    setState('default');
    setExpireDate('');
    setTags([]);
    global.ipcRenderer.invoke('formCreate', newTodo);
    global.ipcRenderer.on('createComplete', () => {
      handleRefresh();
      setisAdding(false);
    });
  };

  const handleExpireDateChange = (date: Date | null) => {
    const formattedDate = dayjs(date).format('YYYY/MM/DD');
    setExpireDate(formattedDate);
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
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          Text:
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          State:
          <select
            value={state}
            onChange={(event) => {
              setState(event.target.value as State);
            }}
          >
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
          <input
            type='text'
            value={tagValue}
            onChange={(event) => {
              setTagvalue(event.target.value);
            }}
          />
          <button onClick={handleTagAdd}>add tag</button>
          {tags.map((tag, index) => (
            <div key={`tag-${index}`}>
              <p>{tag}</p>
              <button onClick={(event) => handleTagDelete(event, tag)}>
                x
              </button>
            </div>
          ))}
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={() => setisAdding(false)}>close</button>
    </>
  );
}

export default TodoForm;