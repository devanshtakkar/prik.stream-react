import { LoaderFunction, useLoaderData } from "react-router-dom";
import { LoaderFunctionArgs } from "react-router-dom";
import { BASE_URL } from "../CONSTANTS";
import MovieCard from "../components/MovieCard";
import SuggestedMovieArea from "../components/SuggestedMovieArea";
import {
    OMDbSearch,
    ErrorResponse,
    SingleMovieRecord,
    GptSuggestedMovie,
} from "../Types";
import {
    Container,
    TextField,
    Typography,
    Card,
    Grid,
    CardContent,
    CardMedia,
    Button,
    CircularProgress,
} from "@mui/material";
import { FormEvent, useState } from "react";

let searchLoader: LoaderFunction = function (args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const searchTerm = url.searchParams.get("movie");
    let searchParams = {
        movie: searchTerm as string,
    };
    const urlParams = new URLSearchParams(searchParams);
    const urlWithParams = `${BASE_URL}/search?${urlParams.toString()}`;

    return fetch(urlWithParams);
};

export default function Search() {
    let [selectedMovie, setSelectedMovie] = useState<SingleMovieRecord>();
    let [recommendedMovies, setRecommendedMovies] =
        useState<Array<GptSuggestedMovie>>();
    let [isLoading, setIsLoading] = useState<boolean>(false);

    function handleClickOnCard(movie: SingleMovieRecord) {
        setSelectedMovie(movie);
    }

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);
        let form = event.target as HTMLFormElement;
        let inputElem = form.elements.item(0) as HTMLInputElement;
        let user_input = inputElem.value;
        try {
            let response = await fetch(`${BASE_URL}/recommend`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    user_input: user_input,
                    movie: selectedMovie,
                }),
            });

            let data: GptSuggestedMovie[] | undefined = await response.json();
            setRecommendedMovies(data);
        } catch {
        } finally {
            setIsLoading(false);
        }
    }

    if (selectedMovie) {
        let movie = selectedMovie;
        return (
            <Container>
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
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {movie.Title} ({movie.Year})
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {movie.Plot}
                                </Typography>
                                <Typography>Genre: {movie.Genre}</Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
                <Typography variant="h4">
                    Enter your favorite movies and the similarities you’re
                    looking for in your recommendations.
                </Typography>
                <form onSubmit={(event) => handleFormSubmit(event)}>
                    <TextField
                        size="medium"
                        variant="filled"
                        fullWidth
                        multiline
                        name="user_input"
                    />
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        sx={{ margin: 2 }}
                    >
                        Lets Search
                    </Button>
                </form>
                {isLoading && <CircularProgress />}
                <SuggestedMovieArea suggestedMovies={recommendedMovies} />
            </Container>
        );
    }

    let movies = useLoaderData() as OMDbSearch | ErrorResponse;
    console.log(movies);
    if ("err" in movies) {
        return <h1>Error</h1>;
    }
    if ("Response" in movies) {
        if (movies.Response == "True") {
            return (
                <Container>
                    <Typography variant="h3">
                        Results: {movies.totalResults}
                    </Typography>
                    {movies.Search.map((movie) => (
                        <MovieCard
                            movie={movie}
                            key={movie.imdbID}
                            handleClickOnCard={handleClickOnCard}
                        />
                    ))}
                </Container>
            );
        } else {
            return <Typography variant="h1">No movies found!</Typography>;
        }
    }
}

export { searchLoader };
