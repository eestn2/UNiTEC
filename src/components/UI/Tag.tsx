interface Props {
  texto: string;
  onDelete?: () => void;
}

const Tag: React.FC<Props> = ({ texto, onDelete }) => {
  return (
    <div className="tag">
      {texto}
      <button className="delete" title="delete tag" onClick={onDelete}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default Tag;
