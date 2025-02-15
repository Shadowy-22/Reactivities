import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDetail() {
	const { id } = useParams();
	const { activity, isLoadingActivity } = useActivities(id)
	const navigate = useNavigate();

    if(isLoadingActivity) return <Typography>Loading Activity Details..</Typography>
    if(!activity ) return <Typography>Activity not found</Typography>

	return (
		<Card sx={{ borderRadius: 3 }}>
			<CardMedia
				component="img"
				src={`/images/categoryImages/${activity.category}.jpg`}
			/>
			<CardContent>
				<Typography variant="h5">{activity.title}</Typography>
				<Typography variant="subtitle1" fontWeight="light">
					{activity.date}
				</Typography>
				<Typography variant="body1">{activity.description}</Typography>
			</CardContent>
			<CardActions>
				<Button color="primary" onClick={() => navigate(`/manage/${activity.id}`)}>
					Edit
				</Button>
				<Button color="inherit" onClick={() => navigate('/activities')}>
					Cancel
				</Button>
			</CardActions>
		</Card>
	);
}
