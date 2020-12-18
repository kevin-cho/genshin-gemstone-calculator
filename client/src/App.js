import { useState } from 'react';
import GemstoneCard from './components/GemstoneCard';
import styles from './App.module.css';

// Represents the display order
const rarities = [5, 4, 3, 2];
const conversionRate = 3;
const defaultState = rarities.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});

const App = () => {
  const [quantities, setQuantities] = useState(defaultState);
  const [results, setResults] = useState(defaultState);
  const [selectedRarity, setSelectedRarity] = useState('');

  const handleQuantityChange = stars => e => {
    setQuantities({ ...quantities, [stars]: Number(e.target.value) });
    setSelectedRarity('');
  };

  const handleConvert = e => {
    const selectedStars = Number(e.target.value);
    const raritiesAscending = [...rarities].sort((a, b) => a - b);
    let tempResult = { ...quantities };
    setSelectedRarity(selectedStars);

    raritiesAscending.forEach(stars => {
      const currentQuantity = tempResult[stars];
      if (stars < selectedStars && currentQuantity >= conversionRate) {
        tempResult = {
          ...tempResult,
          [stars]: currentQuantity % conversionRate,
          [stars + 1]: tempResult[stars + 1] + Math.floor(currentQuantity / 3)
        };
      }
    });

    setResults(tempResult);
  };

  return (
    <div className={styles.root}>
      {rarities.map(stars => (
        <GemstoneCard
          key={stars}
          stars={stars}
          editable
          quantity={quantities[stars]}
          onChange={handleQuantityChange(stars)}
        />
      ))}

      <div className={styles.controls}>
        <select onChange={handleConvert} value={selectedRarity}>
          <option value="">convert to</option>
          {rarities.map(stars => <option key={stars} value={stars}>{stars}</option>)}
        </select>
      </div>

      {rarities.map(stars => (
        <GemstoneCard
          key={stars}
          stars={stars}
          quantity={results[stars]}
        />
      ))}
    </div>
  );
}

export default App;
