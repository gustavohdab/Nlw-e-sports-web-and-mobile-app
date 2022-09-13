// JSX: Javascript + XML (html)

// Componentes / Propriedades

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps){
  return (
    <button>
      {props.title}
    </button>
  )
}

function App() {
  return (
    <div>
      <button title="Send 1" />
      <button title="Send 2" />
      <button title="Send 3" />
      <button title="Send 4" />
    </div>
  )
}

export default App
