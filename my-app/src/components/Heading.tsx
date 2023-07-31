import React, { CSSProperties } from "react";

interface HeadingProps {
  children: string;
  style?: CSSProperties | undefined;
}

const Heading = (props: HeadingProps) => {
  return <h1 style={props.style}>{props.children}</h1>;
};

export default Heading;
