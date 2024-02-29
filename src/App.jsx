import { DynamicForm } from "./components/DynamicForm";

const config = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "age", label: "Age", type: "number", required: true },
  { name: "email", label: "Email", type: "email", required: true },
];

function App() {
  return (
    <div className="container m-auto flex flex-col justify-center items-center min-h-screen">
      <DynamicForm config={config} />
    </div>
  );
}

export default App;
