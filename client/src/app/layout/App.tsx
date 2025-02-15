import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";


function App() {

	return (
		<Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
			<CssBaseline />
			<NavBar />
			<Container
				maxWidth={false}
				sx={{
					mt: 3,
					px: { xs: 2, md: 4 },
					maxWidth: 1800,
				}}
			>
				<Outlet />
			</Container>
		</Box>
	);
}

export default App;
