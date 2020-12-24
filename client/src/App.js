import { useState, useRef, createRef } from 'react';
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
  const inputRefs = useRef(rarities.map(createRef));

  const handleQuantityChange = stars => e => {
    setQuantities({ ...quantities, [stars]: Number(e.target.value) });
    setSelectedRarity('');
  };

  const handleQuantityIncrement = stars => {
    setQuantities({ ...quantities, [stars]: quantities[stars] + 1 });
    setSelectedRarity('');
  };

  const handleQuantityDecrement = stars => {
    setQuantities({ ...quantities, [stars]: Math.max(0, quantities[stars] - 1) });
    setSelectedRarity('');
  };

  const handleConvert = selectedStars => {
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
      {rarities.map((stars, index) => (
        <GemstoneCard
          key={stars}
          stars={stars}
          onClick={() => inputRefs.current[index].current.focus()}
        >
          <span
            className={`material-icons ${styles.controls}`}
            onClick={() => handleQuantityDecrement(stars)}
          >
            remove_circle
          </span>
          <input
            ref={inputRefs.current[index]}
            type="number"
            className={styles.quantity}
            value={quantities[stars]}
            onFocus={e => e.target.select()}
            onChange={handleQuantityChange(stars)}
          />
           <span
            className={`material-icons ${styles.controls}`}
            onClick={() => handleQuantityIncrement(stars)}
          >
            add_circle
          </span>
        </GemstoneCard>
      ))}

      <div className={styles.arrow}>
        <span className="material-icons">
          arrow_downward
        </span>
      </div>

      {rarities.map(stars => (
        <GemstoneCard
          key={stars}
          stars={stars}
          quantity={results[stars]}
          onClick={() => handleConvert(stars)}
        >
          <span className={selectedRarity === stars ? styles.selected : ''}>{results[stars]}</span>
        </GemstoneCard>
      ))}

      <nav className={styles.footer}>
        <a href="https://github.com/kevin-cho/genshin-gemstone-calculator" target="_blank">
          <i className="fa fa-github-square" />
        </a>
      </nav>
    </div>
  );
}

export default App;
