import { useState } from "react";

import { generateRandomTodoId } from "../utils";
import { Button } from "./Button";
import { FormContainer } from "./FormContainer";

interface Todo {
  id: string;
  title: string;
  content: string;
}

interface TodoFormProps {
  submitTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
}

export function TodoListContainer() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  function addTodo(todo: Todo) {
    console.log("wubba todo?", todo, "and todos", todos);
    setTodos([todo, ...todos]);
  }

  function deleteTodo(todoId: string) {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });

    setTodos(filteredTodos);
  }

  return (
    <FormContainer title="Add a Todo">
      <div>
        <TodoForm submitTodo={addTodo} deleteTodo={deleteTodo} />
      </div>
      <div>
        <TodoList todos={todos} />
      </div>
    </FormContainer>
  );
}

export function TodoForm({ submitTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    console.log("form?", form.elements);
    // todo - mess with trying to grab form fields using a form object instead of react state

    submitTodo({
      id: generateRandomTodoId(),
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          className="border-solid border-2 border-indigo-600"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          className="border-solid border-2 border-indigo-600"
          value={content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(event.target.value);
          }}
        />
      </div>
      <div>
        <Button
          disabled={title.trim() === "" || content.trim() === ""}
          type="submit"
        >
          Add Todo
        </Button>
      </div>
    </form>
  );
}

interface TodoListProps {
  todos: Array<Todo>;
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos?.length > 0 ? (
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
            </li>
          );
        })
      ) : (
        <p>No todos yet</p>
      )}
    </ul>
  );
}

export function RandomForm() {
  return (
    true &&
    null && (
      <form className="flex flex-col gap-3">
        <div className="flex">
          {/* 
          the spacing between labels and their inputs is just barely different for Input 1, Input 2, and Input 3. Why??
          bc "2" and "3" take up more space than "1"?? Not sure
        */}
          <label className="px-4">Input 1</label>
          <input className="border-solid border-2 border-indigo-600" />
        </div>
        <div className="flex">
          <label className="px-4">Input 2</label>
          <input className="border-solid border-2 border-indigo-600" />
        </div>
        <div className="flex">
          <label className="px-4">Input 3</label>
          <input className="border-solid border-2 border-indigo-600" />
        </div>
      </form>
    )
  );
}
