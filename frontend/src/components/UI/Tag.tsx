import '../../styles/Tag.css'
import icon from '../../assets/icons/delete.svg'

interface Props {
  texto: string;
  onDelete?: () => void;
}

const Tag: React.FC<Props> = ({ texto, onDelete }) => {
  return (
    <div className="tag">
      {texto}
      <button className="delete" title="delete tag" onClick={onDelete}>
        <img src={icon} alt="delete" />
      </button>
    </div>
  );
};

export default Tag;
