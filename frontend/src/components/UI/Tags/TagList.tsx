import React from "react";

// Types for tags and levels
export interface Tag {
  name: string;
  level?: "Básico" | "Intermedio" | "Avanzado";
}

export type Level = "Básico" | "Intermedio" | "Avanzado";

const LEVELS: Level[] = ["Básico", "Intermedio", "Avanzado"];

// Group tags by level
const groupByLevel = (tags: Tag[]): Record<Level, Tag[]> => {
  return LEVELS.reduce((acc, level) => {
    acc[level] = tags.filter(tag => tag.level === level);
    return acc;
  }, {} as Record<Level, Tag[]>);
};

interface TagListProps {
  tags: Tag[];
  title: string;
  selectedTag?: Tag | null;
  onSelectTag?: (tag: Tag | null) => void;
  isPortrait?: boolean;
  translateX?: (n: number) => number;
  translateY?: (n: number) => number;
}

const TagList: React.FC<TagListProps> = ({
  tags,
  title,
  selectedTag,
  onSelectTag,
  isPortrait = false,
  translateX = n => n,
  translateY = n => n,
}) => {
  const tagsByLevel = groupByLevel(tags);
  return (
    <div className="tag-list-root" style={{ display: "flex", width: "100%", height: "100%" }}>
      <div className="flex-column" style={{
        width: translateY(isPortrait ? 140 : 150),
        borderRight: `${translateX(2)}px solid var(--delimiters)`,
        paddingTop: translateY(7),
        paddingLeft: translateY(7),
        paddingRight: translateY(16),
        gap: translateY(16),
        height: '100%'
      }}>
        <span style={{ fontWeight: 600, fontSize: translateY(22), color: 'rgba(0, 49, 123, 0.8)' }}>{title}</span>
        {LEVELS.map(level => (
          <label key={level} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={selectedTag?.level === level}

              style={{
                accentColor: '#335A95',
                width: translateX(18),
                height: translateX(18),
                pointerEvents: 'none',
              }}
              tabIndex={-1}
            />
            {level}
          </label>
        ))}
      </div>
      <div style={{
        width: "100%",
        borderLeft: `${translateX(2)}px solid var(--delimiters)`,
        borderTopRightRadius: translateX(8),
        borderBottomRightRadius: translateX(8),
        backgroundColor: '#AABAC9',

       height: '100%',
      }}
       >
        <div className='tag-display-profile' style={{ overflowY: 'scroll', height: '100%',width: "100%",
           display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        paddingTop:  translateY(8),
        paddingBottom: translateY(8)
         }}>
          {Object.values(tagsByLevel).flat().length === 0 ? (
            <span style={{ color: 'rgba(0, 49, 123, 0.5)', textAlign: 'center' }}>No parece haber nada aquí.</span>
          ) : (
            Object.values(tagsByLevel).flat().map(tag => {
              const isSelected = selectedTag?.name === tag.name;
              return (
                <span
                  key={tag.name}
                  style={{
                    display: 'inline-block',
                    margin: `${translateY(4)}px 0`,
                    padding: `${translateY(4)}px ${translateY(8)}px`,
                    backgroundColor: isSelected ? '#D6F5F9' : '#fff',
                    borderRadius: translateX(20),
                    width: translateY(isPortrait ? 145 : 185),
                    textAlign: 'center',
                    cursor: onSelectTag ? 'pointer' : 'default',
                    fontWeight: isSelected ? 600 : undefined,
                    color: isSelected ? '#113893' : undefined,
                    border: isSelected ? '2px solid #00B6D9' : 'none',
                    transition: 'all 0.15s, border 0.15s',
                  }}
                  onClick={() => onSelectTag && onSelectTag(isSelected ? null : tag)}
                >
                  {tag.name}
                </span>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default TagList;
