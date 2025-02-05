import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
	activityRegistry = new Map<string, Activity>()
	selectedActivity: Activity | undefined = undefined;
	editMode = false;
	loading = false;
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	/* COMPUTED PROPERTIES */
	get activitiesByDate() {
		return Array.from(this.activityRegistry.values())
			.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
	}

	/* ACTIONS */
	loadActivities = async () => {
		try {
			const activities = await agent.Activities.list();

			// We use this to format the ISO date without the Time
			activities.forEach((activity) => {
				activity.date = activity.date.split("T")[0];
				this.activityRegistry.set(activity.id, activity);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	selectActivity = (id: string) => {
		this.selectedActivity = this.activityRegistry.get(id);
	};

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
		// In case the activity with the id is populated we utilize that function to set it (EDIT). 
        if(id) {
            this.selectActivity(id);
        } else {
			// If the form was open we utilize the second function to make the Activity undefined and the form empty (CREATE). 
            this.cancelSelectedActivity();
        }
        this.editMode = true;
    } 

    closeForm = () => {
        this.editMode = false;
    }

	createActivity = async (activity: Activity) => {
		this.loading = true
		activity.id = uuid()
		try {
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
				if(this.selectedActivity?.id === id){
					this.cancelSelectedActivity()
				}
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
