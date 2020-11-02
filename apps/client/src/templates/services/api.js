import { httpDelete } from 'shared/services/api';

export const deleteBranch = ({ projectId, branch }) =>
  httpDelete(`/templates/${projectId}/${branch}`);
