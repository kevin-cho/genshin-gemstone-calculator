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

const GemstoneCard = ({
  stars = 2,
  children,
  className,
  ...rest
}) => {
  const imageUrl = getImageUrl(stars);

  return (
    <div className={`${styles.root} ${className}`} {...rest}>
      <img
        src={imageUrl}
        alt={`gemstone-${stars}-stars`}
      />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default GemstoneCard;
