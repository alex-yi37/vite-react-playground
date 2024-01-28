import "./App.css";

// import { Button } from "./components/Button";
import { RandomForm, TodoListContainer } from "./components/TodoForm";

function App() {
  return (
    <>
      <main>
        <TodoListContainer />

        <RandomForm />
      </main>
    </>
  );
}

export default App;
