import React from 'react';
import { Editor } from 'shared/components';

const DynamicProps = ({ dynamicProps, onChange, baseTemplateUrl }) => (
  <Editor value={dynamicProps} onChange={onChange} />
);

export default DynamicProps;
