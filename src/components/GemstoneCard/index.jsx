import gemstone2 from '../../assets/gemstone-2.png';
import gemstone3 from '../../assets/gemstone-3.png';
import gemstone4 from '../../assets/gemstone-4.png';
import gemstone5 from '../../assets/gemstone-5.png';
import styles from './GemstoneCard.module.css';

const getImageUrl = stars => {
  switch(stars) {
    case 2:
      return gemstone2;
    case 3:
      return gemstone3;
    case 4:
      return gemstone4;
    case 5:
      return gemstone5;
    default:
  }
};

const handleFocus = e => e.target.select();

const GemstoneCard = ({
  stars = 2,
  quantity = 0,
  editable = false,
  onChange
}) => {
  const imageUrl = getImageUrl(stars);

  return (
    <div className={styles.root}>
      <img
        src={imageUrl}
        alt={`gemstone-${stars}-stars`}
      />
      {editable
        ? <input className={styles.quantity} value={quantity} onFocus={handleFocus} onChange={onChange} />
        : <span className={styles.quantity}>{quantity}</span>
      }
    </div>
  );
};

export default GemstoneCard;
