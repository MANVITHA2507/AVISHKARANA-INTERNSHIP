import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#667eea' }}>Todo App</h1>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: '10px', border: '2px solid #667eea', fontSize: '1rem', outline: 'none' }}
        />
        <button
          onClick={addTodo}
          style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.2rem', cursor: 'pointer' }}
        >+</button>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ padding: '8px 16px', background: filter === f ? '#667eea' : '#e0e0e0', color: filter === f ? 'white' : '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', textTransform: 'capitalize' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos
          .filter(todo => filter === 'all' ? true : filter === 'active' ? !todo.completed : todo.completed)
          .map(todo => (
            <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', marginBottom: '10px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#aaa' : '#333' }}>
                {todo.text}
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => toggleTodo(todo.id)}>✅</button>
                <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;