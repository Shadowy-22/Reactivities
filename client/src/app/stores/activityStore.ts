import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../lib/types/index.d.ts";
import agent from "../../lib/api/agent.ts";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>()
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	/* HELPER ACTIONS */
	private getActivity = (id: string) => {
		return this.activityRegistry.get(id);
	}
	
	private setActivity = (activity: Activity) => {
		activity.date = activity.date.split('T')[0]
		this.activityRegistry.set(activity.id, activity)
	}

	private setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	/* COMPUTED PROPERTIES */
	get activitiesByDate() {
		return Array.from(this.activityRegistry.values())
			.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
	}

	get groupedActivities() {
		return Object.entries(
			this.activitiesByDate.reduce((activities, activity) => {
				const date = activity.date; // Extracts the date as a string
				activities[date] = activities[date] 
					? [...activities[date], activity]  // If the date exists, append activity
					: [activity]; // If not, create a new array for this date
				return activities;
			}, {} as {[key: string]: Activity[]}) // Initial empty object
		)
	}

	/* ACTIONS */
	loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if(activity) {
			this.selectedActivity = activity
			return activity
		} else {
			this.setLoadingInitial(true);
			try {
				activity = await agent.Activities.details(id);
				this.setActivity(activity);
				runInAction(() => this.selectedActivity = activity)
				this.setLoadingInitial(false);
				return activity
			} catch (error) {
				console.log(error);
				this.setLoadingInitial(false);
			} 
		}
	}

	loadActivities = async () => {
		this.setLoadingInitial(true);
		try {
			const activities = await agent.Activities.list();
			// We use this to format the ISO date without the Time
			activities.forEach((activity) => {
				this.setActivity(activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	createActivity = async (activity: Activity) => {
		this.loading = true
		try {
			if(!activity.id){
				activity.id = uuid();
			}
			await agent.Activities.create(activity)
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity);
				this.selectedActivity = activity
				this.editMode = false;
				this.loading = false;
			})
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading = false
			})
		}
	}

	updateActivity = async (activity: Activity) => {
		this.loading = true
		try {
			await agent.Activities.update(activity)
			runInAction(() => {
				this.activityRegistry.set(activity.id, activity)
				this.selectedActivity = activity
				this.editMode = false;
				this.loading = false;
			})
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading = false
			})
		}
	}

	deleteActivity = async (id: string) => {
		this.loading = true
		try {
			await agent.Activities.delete(id)
			runInAction(() => {
				this.activityRegistry.delete(id)
				this.loading = false
			})			
		} catch (error) {
			console.log(error)
			runInAction(() => {
				this.loading = false
			})
		}
	}
}
