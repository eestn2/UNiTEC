
import AppWindow from './UI/AppWindow'
import ActionButton from './UI/ActionButton'

function App() {
 return (
    <div className="App">
      <AppWindow width={350} height={620}/>
      <ActionButton height={60} text="Iniciar Sesión"/>
    </div>

 )
}

export default App
