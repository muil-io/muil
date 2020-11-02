import { deleteWithToken } from 'shared/services/api';

export const deleteBranch = ({ projectId, branch }) => deleteWithToken(`/templates/${projectId}/${branch}`);
