import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

function Home() {

  const userInfo = useContext(UserContext);
  const [inputVal, setInputVal] = useState('');
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/todos', {withCredentials:true})
      .then(response => {
        setTodos(response.data);
      })
  }, []);

  if (!userInfo.email) {
    return 'You need to be logged in to see this page.';
  }

  function addTodo(e) {
    e.preventDefault();
    axios.put('http://localhost:4000/todos', {text:inputVal}, {withCredentials:true})
    .then(response => {
      setTodos([...todos, response.data]);
      setInputVal('');
    })

  }

  return <div>
    <form onSubmit={e => addTodo(e)}>
      <input placeholder={"What do you want to do next"}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)} />
    </form>
    <ul>
      {todos.map(todo => (
        <li>
          <input type={'checkbox'}
            checked={todo.done}
            // onClick={() => updateTodo(todo)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  </div>
}

export default Home;