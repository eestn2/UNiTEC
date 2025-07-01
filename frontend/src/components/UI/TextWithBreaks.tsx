import { Fragment } from "react";

const TextWithBreaks = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </>
  );
};
export default TextWithBreaks