import React from 'react';
import { Editor } from 'shared/components';

const DynamicProps = ({ dynamicProps, onChange }) => (
  <Editor value={dynamicProps} onChange={onChange} />
);

export default DynamicProps;
