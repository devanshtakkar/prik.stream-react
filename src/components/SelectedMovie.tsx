import { Container, Typography, Box, Paper } from "@mui/material";
import { SingleMovieRecord } from "../Types";

interface SelectedMovieProps {
    movie: SingleMovieRecord;
}
export default function SelectedMovie(props: SelectedMovieProps) {
    let movie = props.movie;
    return (
        <Container>
            <Typography variant="h1">{movie.Title}</Typography>
            <Typography variant="subtitle1">Year: {movie.Year}</Typography>
            <Paper elevation={2}>
                <Box component="img" src={movie.Poster}></Box>
            </Paper>
        </Container>
    );
}
