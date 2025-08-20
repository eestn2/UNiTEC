import React, { useState, useRef, useEffect } from "react";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import ActionButton from "../ActionButton";

interface ExpandableTextBoxProps {
  title: string;
  description: string;
  initialHeight: number;
  width?: number;
  style?: React.CSSProperties;
}

const ExpandableTextBox: React.FC<ExpandableTextBoxProps> = ({
  title,
  description,
  initialHeight,
  width = 580,
  style = {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setOverflowing(descriptionRef.current.scrollHeight > initialHeight);
    }
  }, [description, initialHeight]);

  return (
    <div
      style={{
        width:TranslateFigmaCoords.translateFigmaX(width) ,
        borderRadius: TranslateFigmaCoords.translateFigmaX(20),
        backgroundColor: "#E4E7F2",
        padding: TranslateFigmaCoords.translateFigmaX(8),
        fontSize: "medium",
        color: "#113893",
        ...style,
      }}
    >
      <h3 style={{ fontWeight: "bold", marginBottom: TranslateFigmaCoords.translateFigmaY(4) }}>
        {title}
      </h3>

      <div
        ref={descriptionRef}
        style={{
          maxHeight: expanded ? "none" :TranslateFigmaCoords.translateFigmaX(initialHeight as number),
          overflow: "hidden",
          whiteSpace: "pre-wrap",
          transition: "max-height 0.3s ease",
          fontSize: "medium",
        }}
      >
        {description}
      </div>

      {overflowing && (
        <div style={{ width: "100%", display: "flex", justifyContent:"flex-end" }}>
        <ActionButton
          action={() => setExpanded((prev) => !prev)}
          height={30}
          text={expanded ? "Ver menos" : "Ver más"}
          style={{
            marginTop: TranslateFigmaCoords.translateFigmaY(6),
            color: "white",
            paddingRight: TranslateFigmaCoords.translateFigmaY(6),
            paddingLeft: TranslateFigmaCoords.translateFigmaY(6),
            marginRight: TranslateFigmaCoords.translateFigmaY(30),
          }}
        >
          
        </ActionButton>
        </div>
      )}
    </div>
  );
};

export default ExpandableTextBox;
