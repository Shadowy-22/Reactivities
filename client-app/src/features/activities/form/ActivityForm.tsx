import { Button, Form, Segment } from "semantic-ui-react"
import { ChangeEvent, useState } from "react"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"

const ActivityForm = () => {
  
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    if(!activity.id){
      createActivity(activity)
    } else {
      updateActivity(activity)
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    console.log(activity.id)
    setActivity({...activity, [name]: value})
  }
  
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
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
