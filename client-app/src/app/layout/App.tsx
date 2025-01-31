import { useEffect, useState } from 'react';
import './styles.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        const activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0]
          activities.push(activity); 
        })
        setActivities(activities);
        setLoading(false);
      })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(act => act.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    // In case the activity with the id is populated we utilize that function to set it (EDIT). 
    // And if the form was already open we utilize the second function to make the Activity undefined (CREATE). 
    if (id) {
      handleSelectActivity(id);
    } else {
      handleCancelSelectActivity();
    }
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    // To start loading indicators
    setSubmitting(true);

    // Updates the existing array of activities if the API operations succeeded
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((act) => act.id !== activity.id), activity]);
      })
    } else {
      // Sets the activity ID since it doesnt have it by default
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      })
    }

     // Sets the activity and editMode to display the activity on the dashboard
     setSelectedActivity(activity);
     setEditMode(false);
     setSubmitting(false);
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((act) => act.id !== id));
      
      if(selectedActivity?.id === id){
        setSelectedActivity(undefined);
      }

      setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content="Loading App..." />

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity} 
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
