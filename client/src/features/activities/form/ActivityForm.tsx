import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";


export default function ActivityForm() {
	const { id } = useParams()
	const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id)
	const navigate = useNavigate()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data: {[key: string]: FormDataEntryValue } = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

		if(activity){
			data.id = activity.id
			updateActivity.mutate(data as unknown as Activity, {
				onSuccess: () => navigate(`/activities/${activity.id}`)
			})
			
		} else {
			createActivity.mutate(data as unknown as Activity, {
				onSuccess: (id) => navigate(`/activities/${id}`)
			})
		}
    };

	if(isLoadingActivity) return <Typography>Loading Form..</Typography>

	return (
		<Paper sx={{ borderRadius: 3, padding: 3 }}>
			<Typography variant="h5" gutterBottom color="primary">
				{activity ? "Edit Activity" : "Create Activity"} 
			</Typography>
			<Box component="form" display="flex" flexDirection="column" onSubmit={handleSubmit} gap={3}>
				<TextField
                    name="title"
					label="Title"
					defaultValue={activity?.title}
				></TextField>
				<TextField
                    name="description"
					label="Description"
					multiline
					rows={3}
					defaultValue={activity?.description}
				></TextField>
				<TextField
                    name="category"
					label="Category"
					defaultValue={activity?.category}
				></TextField>
				<TextField
                    name="date"
					label="Date"
					type="date"
					defaultValue={activity?.date 
						? new Date(activity.date).toISOString().split('T')[0] 
						: new Date().toISOString().split('T') 
					}
					slotProps={{ inputLabel: { shrink: true } }}
				></TextField>
				<TextField
                    name="city"
					label="City"
					defaultValue={activity?.city}
				></TextField>
				<TextField
                    name="venue"
					label="Venue"
					defaultValue={activity?.venue}
				></TextField>
				<Box display="flex" justifyContent="end" gap={3}>
					<Button 
						onClick={ 
							() => id ? navigate(`/activities/${activity?.id}`) : navigate('/activities/')
						} 
						color="inherit"
					>
						Cancel
					</Button>
					<Button type="submit" color="success" variant="contained" loading={updateActivity.isPending || createActivity.isPending}>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
