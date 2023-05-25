import { Todo } from '../interfaces/Todo';

type Props = {
  todoData: Todo;
};

function ViewDefault({ todoData }: Props) {
  return (
    <>
      <h3>{todoData.title}</h3>
      <p>{todoData.text}</p>
      {todoData.tag.map((tag, index) => (
        <div key={`tag-${index}`}>
          <p>{tag}</p>
        </div>
      ))}
    </>
  );
}

export default ViewDefault;
