import { Todo } from '../interfaces/Todo';

type Props = {
  todoData: Todo;
};

function ViewDetail({ todoData }: Props) {
  return (
    <>
      <p>detail page</p>
      <h3>{todoData.title}</h3>
      <p>{todoData.text}</p>
      <p>{todoData.expire_date}</p>
      <p>{todoData.state}</p>
      {todoData.tag.map((tag, index) => (
        <div key={`tag-${index}`}>
          <p>{tag}</p>
        </div>
      ))}
    </>
  );
}

export default ViewDetail;
