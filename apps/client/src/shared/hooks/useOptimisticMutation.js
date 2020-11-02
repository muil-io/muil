import { useMutation, queryCache } from 'shared/hooks/useQuery';

const useOptimisticMutation = (key, fetch, mutateData, { refetchOnSuccess, refretchOnError } = {}) => {
	const [mutate] = useMutation(fetch, {
		onMutate: (payload) => {
			const previousData = queryCache.getQueryData(key);

			queryCache.setQueryData(key, mutateData?.({ previousData, ...payload }) || previousData);
			return () => queryCache.setQueryData(key, previousData);
		},
		// eslint-disable-next-line handle-callback-err
		onError: (err, newData, rollback) => rollback(),
		onSettled: (newData, error) => {
			if ((!error && refetchOnSuccess) || (error && refretchOnError)) {
				return queryCache.refetchQueries(key, { exact: true, force: true });
			}
		},
	});

	return mutate;
};

export default useOptimisticMutation;
