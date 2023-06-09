import { Todo } from '../renderer/interfaces/Todo';
import fs from 'fs/promises';
import path from 'path';

//각 함수에서 반복되는 부분 제거해야할듯

//ui창에서 입력한 데이터 객체형태로 전달
export async function addTodoProcess(formData: Todo) {
  const filePath = path.join(process.cwd(), 'public', 'FormData.json');

  await checkFileExists(filePath);

  // 파일이 존재하는 경우
  const todosRaw = await fs.readFile(filePath, 'utf-8');
  const todos = JSON.parse(todosRaw) as Todo[];
  todos.push(formData);
  const updatedTodos = JSON.stringify(todos);
  await fs.writeFile(filePath, updatedTodos);
  console.log(`Todo with id ${formData.id} has been created.`);
}

//id를 기반으로 todo를 확인하고 전달받은 내용대로 갱신
export async function updateTodoProcess(id: string, formData: Todo) {
  const filePath = path.join(process.cwd(), 'public', 'FormData.json');

  await checkFileExists(filePath);

  // 파일을 불러옵니다.
  const rawData = await fs.readFile(filePath, 'utf-8');
  const data: Todo[] = JSON.parse(rawData);
  const targetTodo = data.find((todo) => todo.id === id);

  if (targetTodo) {
    // 해당 todo 객체가 존재하면 업데이트합니다.
    const updatedTodo = { ...targetTodo, ...formData };
    const updatedTodos = data.map((todo) => {
      if (todo.id === id) {
        return updatedTodo;
      } else {
        return todo;
      }
    });

    // 파일에 데이터를 다시 씁니다.
    fs.writeFile(filePath, JSON.stringify(updatedTodos));
    console.log(`Todo with id ${id} has been updated.`);
  } else {
    console.log(`해당 id(${id})를 가진 todo가 존재하지 않습니다.`);
  }
}

export async function deleteTodoProcess(id: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'FormData.json');

    await checkFileExists(filePath);

    // 파일을 불러옵니다.
    const rawData = await fs.readFile(filePath, 'utf-8');
    const data: Todo[] = JSON.parse(rawData);

    // id 값이 일치하지 않는 객체들로 이루어진 새로운 배열을 생성합니다.
    const filteredData = data.filter((todo) => todo.id !== id);

    // 새로운 배열을 JSON 형식으로 변환하여 파일에 다시 저장합니다.
    await fs.writeFile(filePath, JSON.stringify(filteredData, null, 2));

    console.log(`Todo with id ${id} has been deleted.`);
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
  }
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
