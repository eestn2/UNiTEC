import '../../styles/Tag2.css';
import icon from '../../assets/icons/trash.svg';
import starIcon from '../../assets/icons/star.svg'; // ⭐ Usa acá la imagen que quieras repetir

interface Props {
  texto: string;
  checkBox: string;
  onDelete: () => void;
}

const Tag2: React.FC<Props> = ({ texto, checkBox, onDelete }) => {
  const getLevelCount = (level: string) => {
    if (level === "Básico") return 1;
    if (level === "Intermedio") return 2;
    if (level === "Avanzado") return 3;
    return 0;
  };

  const levelCount = getLevelCount(checkBox);

  return (
    <div className="tag2">
      <span className="tag2-text">{texto}</span>

      <div className="tag2-level">
        {Array.from({ length: levelCount }).map((_, i) => (
          <img
            key={i}
            src={starIcon}
            alt="level"
            className="tag2-level-icon"
          />
        ))}
      </div>

      <button className="tag2-delete" title="delete tag" onClick={onDelete}>
        <img src={icon} alt="delete" />
      </button>
    </div>
  );
};

export default Tag2;
