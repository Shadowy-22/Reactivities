import { Button, Form, Segment } from "semantic-ui-react"
import { Activity } from "../../../app/models/activity"
import { ChangeEvent, useState } from "react"

interface Props {
  activity: Activity | undefined,
  closeForm: () => void
  createOrEdit: (activity: Activity) => void,
  submitting: boolean
}

const ActivityForm = ({
  activity: selectedActivity, // Alias
  closeForm, 
  createOrEdit,
  submitting
}: Props) => {
  
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
    createOrEdit(activity)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
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
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" onClick={closeForm} />
      </Form>
    </Segment>
  )
}

export default ActivityForm
