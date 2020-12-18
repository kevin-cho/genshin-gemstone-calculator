import GemstoneCard from './components/GemstoneCard';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <GemstoneCard stars={5} />
      <GemstoneCard stars={4} />
      <GemstoneCard stars={3} />
      <GemstoneCard stars={2} />
    </div>
  );
}

export default App;
