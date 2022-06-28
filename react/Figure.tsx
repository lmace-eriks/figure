import React from 'react';

// Styles V1
import styles from "./styles.css";

interface FigureProps {

}

const Figure: StorefrontFunctionComponent<FigureProps> = ({ }) => {

  return (
    <h3>Hello World!</h3>
  )
}

Figure.schema = {
  title: 'editor.hoverfeature.title',
  description: 'editor.hoverfeature.description',
  type: 'object',
  properties: {}
}

export default Figure;