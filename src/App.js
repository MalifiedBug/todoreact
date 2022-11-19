import './App.css';
import Todo from './Todo';

function App() {
  return (
    <div className="App">
      <Todo />
      <h3>To see edited todo; add new todo to rerender the app automatically</h3>
      <h4>
        Used Formik and Yup for forms and validation
      </h4>
      <h5>Used MUI popover to edit todo.</h5>
    </div>
  );
}

export default App;
