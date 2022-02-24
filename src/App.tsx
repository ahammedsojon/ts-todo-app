import './App.css';
import TodoList from './components/TodoList';
import TodoProvider from './contexts/TodoProvider';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <h2 className='mb-5 text-center'>Todo App</h2>
          <TodoProvider>
            <TodoList></TodoList>
          </TodoProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
