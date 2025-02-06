import MatrixForm from "./components/MatrixForm";
import { MatrixProvider } from "./components/MatrixProvider";
import Table from "./components/Table";

function App() {
  return (
    <div className="app">
      <MatrixProvider>
        <div className="heading">
          <h1>DynamicMatrix </h1>
          <MatrixForm />
        </div>
        <Table />
      </MatrixProvider>
    </div>
  );
}

export default App;
