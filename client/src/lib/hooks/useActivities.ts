import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) => {
	const queryClient = useQueryClient();

	const { data: activities, isPending } = useQuery({
		queryKey: ["activities"],
		queryFn: () => agent.Activities.list(),
	});

	const { data: activity, isLoading: isLoadingActivity } = useQuery({
		queryKey: ["activity", id],
		queryFn: () => agent.Activities.details(id!),
		enabled: !!id
	});

	const updateActivity = useMutation({
		mutationFn: (activity: Activity) => agent.Activities.update(activity),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["activities"],
			});
		},
	});

	const createActivity = useMutation({
		mutationFn: (activity: Activity) => agent.Activities.create(activity),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["activities"],
			});
		},
	});

	const deleteActivity = useMutation({
		mutationFn: (id: string) => agent.Activities.delete(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["activities"],
			});
		},
	});

	return {
		activities,
		isPending,
		activity,
		isLoadingActivity,
		updateActivity,
		createActivity,
		deleteActivity,	
	};
};
