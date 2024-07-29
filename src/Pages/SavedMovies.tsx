import {
    LoaderFunction,
    useLoaderData,
    useNavigate
} from "react-router-dom";
import { BASE_URL } from "../CONSTANTS";
import { SavedMovieRes, ErrorResponse } from "../Types";
import { Container, Typography } from "@mui/material";
import {
    Card,
    Grid,
    CardMedia,
    CardContent,
    CardActions,
    Alert,
    Button,
} from "@mui/material";

export let displaySavedMovieLoader: LoaderFunction = async function ({
    params,
}) {
    let userId = params.userID;
    return fetch(`${BASE_URL}/user/movies?userID=${userId}`);
};
import { useState } from "react";
export default function SavedMovies() {
    let navigate = useNavigate();
    let movies = useLoaderData() as ErrorResponse | SavedMovieRes[];
    let [alert, setAlert] = useState<boolean>(false);
    let [alertText, setAlertText] = useState("");

    console.log(movies);
    let id = 0
    if ("err" in movies) {
        return <h1>Error</h1>;
    } else {
        return (
            <Container>
                <Typography variant="h3">Results: {movies.length}</Typography>
                {movies.map((movie) => (
                    <Card raised sx={{ marginTop: 2, marginBottom: 2 }} key={id++}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <CardMedia
                                    sx={{ height: { xs: 180, md: 300 } }}
                                    image={movie.poster as string}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {movie.title} ({movie.year})
                                    </Typography>
                                    <Typography variant="body1">
                                        Director: {movie.director}
                                    </Typography>
                                    <Typography variant="body1">
                                        Staring: {movie.actors}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {movie.brief_reason}
                                    </Typography>
                                    <Typography variant="h6">
                                        Genre: {movie.genre}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                        <CardActions>
                            <Button
                                variant="contained"
                                onClick={async () => {
                                    try {
                                        let response = await fetch(
                                            `${BASE_URL}/user/movie`,
                                            {
                                                method: "DELETE",
                                                headers: {
                                                    "Content-Type":
                                                        "application/json",
                                                },

                                                body: JSON.stringify({
                                                    userId: movie.userId,
                                                    movie: movie,
                                                }),
                                            }
                                        );

                                        let body:
                                            | SavedMovieRes
                                            | ErrorResponse =
                                            await response.json();

                                        console.log(body);

                                        if ("title" in body) {
                                            setAlert(true);
                                            setAlertText("Movie Deleted");
                                        } else {
                                            setAlert(true);
                                            setAlertText(body.err);
                                        }
                                    } catch {
                                    } finally {
                                        navigate("");
                                    }
                                }}
                            >
                                DELETE
                            </Button>
                        </CardActions>
                        {alert ? (
                            <Alert
                                onClose={() => {
                                    setAlert(false);
                                }}
                            >
                                {alertText}
                            </Alert>
                        ) : (
                            <></>
                        )}
                    </Card>
                ))}
            </Container>
        );
    }
}
