import {
    Card,
    Grid,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    Alert,
} from "@mui/material";
import { ErrorResponse, GptSuggestedMovie, SavedMovieRes } from "../Types";
import { FormEvent, useState } from "react";
import { BASE_URL } from "../CONSTANTS";

interface SuggestedMovieCardProps {
    movie: GptSuggestedMovie;
}
export default function SuggestedMovieCard(props: SuggestedMovieCardProps) {
    let movie = props.movie;
    if(movie == null){
        return <></>
    }
    let [alert, setAlert] = useState<boolean>(false);
    let [alertText, setAlertText] = useState("");
    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        let form = event.target as HTMLFormElement;
        console.log(form);
        let emailElem = form.elements.item(0) as HTMLInputElement;
        let email = emailElem.value;
        let nameElem = form.elements.item(1) as HTMLInputElement;
        let name = nameElem.value;
        try {
            let response = await fetch(`${BASE_URL}/user/movie`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email: email,
                    name: name,
                    movie: movie,
                }),
            });

            let body: SavedMovieRes[] | SavedMovieRes | ErrorResponse =
                await response.json();

            console.log(body);

            if (body instanceof Array) {
                setAlert(true);
                setAlertText("Movie saved");
            } else if ("title" in body) {
                setAlert(true);
                setAlertText("Movie saved");
            } else {
                setAlert(true);
                setAlertText(body.err);
            }
        } catch {
        } finally {
        }
    }
    return (
        <Card raised sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <CardMedia
                        sx={{ height: { xs: 180, md: 300 } }}
                        image={movie.Poster}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.Title} ({movie.Year})
                        </Typography>
                        <Typography variant="body1">
                            Director: {movie.Director}
                        </Typography>
                        <Typography variant="body1">
                            Staring: {movie.Actors}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {movie.brief_reason}
                        </Typography>
                        <Typography variant="h6">
                            Genre: {movie.Genre}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
            <CardActions>
                <form onSubmit={handleFormSubmit}>
                    <TextField label="email"></TextField>
                    <TextField label="name"></TextField>
                    <Button variant="contained" type="submit">
                        Save Movie
                    </Button>
                </form>
            </CardActions>
            {alert ? (
                <Alert
                    onClose={() => {
                        setAlert(false);
                    }}
                >
                    {alertText}
                </Alert>
            ) : <></>}
        </Card>
    );
}
