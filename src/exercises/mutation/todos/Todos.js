import fetchMock from "fetch-mock";
import { useQuery } from "react-query";
import { TodoForm } from "./TodoForm";

const todosMock = ["прочитати", "оновити"];

fetchMock.get("api/todos", todosMock);
fetchMock.post("api/todos", async (_, res) => {
  // todosMock.push(res.body);
  await new Promise((resolve) => setTimeout(resolve, 200));

  const wrongWord = ['смалити', 'випивати'];
  const isWrong = wrongWord.includes(res.body);
  if (isWrong) {
    return new Response ('', {
      status: 400,
      statusText: 'this is a bad thing',
    });
  }
  todosMock.push(res.body);

  return 200;
});

export const Todos = () => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
  } = useQuery(["todos"], async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return fetch("api/todos").then((res) => res.json());
  });

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      <h3>Мій список справ{isFetching ? "..." : null}</h3>
      <ul>
        {todos.map((todo, index) => (
          <ul key={index}>{todo}</ul>
        ))}
      </ul>
      <TodoForm />
    </div>
  );
};
