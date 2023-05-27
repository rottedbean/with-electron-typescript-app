// /api 아래에 서버리스로 넣으면 굳이 함수들이 여기 있을 이유가 없는게?
import { Todo } from '../renderer/interfaces/Todo';
import fs from 'fs/promises';
import path from 'path';

import isDev from 'electron-is-dev';

const filePath = isDev
  ? path.join(process.cwd(), 'public', 'FormData.json')
  : path.join(__dirname, '../../public/FormData.json');

//ui창에서 입력한 데이터 객체형태로 전달
export async function addTodoProcess(formData: Todo) {
  const todos = await loadFile(filePath);
  todos.push(formData);
  const updatedTodos = JSON.stringify(todos);
  try {
    await fs.writeFile(filePath, updatedTodos);
    console.log(`Todo with id ${formData.id} has been created.`);
  } catch (error) {
    console.error(`Error creating todo`, error);
  }
}
/** id를 기반으로 todo를 확인하고 전달받은 내용대로 갱신*/
export async function updateTodoProcess(id: string, formData: Todo) {
  const todos = await loadFile(filePath);
  const targetTodo = todos.find((todo) => todo.id === id);

  if (targetTodo) {
    // 해당 todo 객체가 존재하면 업데이트합니다.
    const updatedTodo = { ...targetTodo, ...formData };
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      } else {
        return todo;
      }
    });
    // 파일에 데이터를 다시 씁니다.
    try {
      await fs.writeFile(filePath, JSON.stringify(updatedTodos, null, 2));
      console.log(`Todo with id ${id} has been updated.`);
    } catch (error) {
      console.error(`Error updating todo with id ${id}:`, error);
    }
  } else {
    console.log(`Todo with id ${id} didn't exist.`);
  }
}

export async function deleteTodoProcess(id: string) {
  const todos = await loadFile(filePath);

  // id 값이 일치하지 않는 객체들로 이루어진 새로운 배열을 생성합니다.
  const filteredData = todos.filter((todo) => todo.id !== id);
  try {
    // 새로운 배열을 JSON 형식으로 변환하여 파일에 다시 저장합니다.
    await fs.writeFile(filePath, JSON.stringify(filteredData, null, 2));
    console.log(`Todo with id ${id} has been deleted.`);
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
  }
}

// 파일을 불러옵니다.
export async function loadFile(filePath: string): Promise<Todo[]> {
  await checkFileExists(filePath);

  const rawData = await fs.readFile(filePath, 'utf-8');
  const data: Todo[] = JSON.parse(rawData);
  return data;
}

//파일 존재 여부 확인, 없으면 공백문서 생성
async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      fs.writeFile(filePath, JSON.stringify([]));
      return false;
    } else {
      throw err;
    }
  }
}
