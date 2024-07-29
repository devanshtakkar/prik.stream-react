import { SingleMovieRecord } from "../Types";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    CardActionArea,
} from "@mui/material";

interface MovieCardProps {
    movie: SingleMovieRecord;
    handleClickOnCard?: (m: SingleMovieRecord) => void;
}
export default function MovieCard(props: MovieCardProps) {
    let movie = props.movie;
    return (
        <CardActionArea onClick={() => props.handleClickOnCard!(movie)}>
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
                            <Typography variant="body2" color="text.secondary">
                                {movie.Plot}
                            </Typography>
                            <Typography>Genre: {movie.Genre}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </CardActionArea>
    );
}
