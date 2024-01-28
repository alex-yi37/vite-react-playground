import "./App.css";

// import { Button } from "./components/Button";
import { TodoForm, RandomForm } from "./components/TodoForm";
import { FormContainer } from "./components/FormContainer";

function App() {
  return (
    <>
      <main>
        <FormContainer title="Add a Todo">
          <TodoForm
            submitTodo={(todo: {
              id: string;
              title: string;
              content: string;
            }) => {
              console.log(`the todo`, todo);
            }}
          />
        </FormContainer>
        <RandomForm />
      </main>
    </>
  );
}

export default App;
