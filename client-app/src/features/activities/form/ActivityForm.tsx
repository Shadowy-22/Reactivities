import { Button, Form, Segment } from "semantic-ui-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Activity } from "../../../app/models/activity"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import {v4 as uuid} from 'uuid';

const ActivityForm = () => {
  
  const { activityStore } = useStore();
  const { createActivity, updateActivity, 
      loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if(id){
      loadActivity(id).then(activity => {
        if(activity) setActivity(activity)
      })
    }
  }, [id, loadActivity])

  function handleSubmit() {
    if(!activity.id){
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setActivity({...activity, [name]: value})
  }

  if(loadingInitial) return <LoadingComponent content='Loading Activity...' />
  
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input 
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name="description"  
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input 
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}  
        />
        <Form.Input
          type="date" 
          name="date"
          placeholder="Date" 
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input 
          name="city"
          placeholder="City" 
          value={activity.city}
          onChange={handleInputChange} 
        />
        <Form.Input 
          name="venue"
          placeholder="Venue" 
          value={activity.venue}
          onChange={handleInputChange} 
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button as={Link} to={`/activities/${activity.id}`} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
