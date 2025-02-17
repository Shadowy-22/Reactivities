import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
	const location = useLocation();

	return (
		<Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
			<CssBaseline />
			{location.pathname === "/" ? (
				<HomePage />
			) : (
				<>
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
				</>
			)}
		</Box>
	);
}

export default App;
