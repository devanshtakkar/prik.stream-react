import { Container, Typography } from "@mui/material";
import { ErrorResponse, GptSuggestedMovie } from "../Types";
import SuggestedMovieCard from "./SuggestedMovieCard";

interface SuggestedMovieAreaProps{
    suggestedMovies: GptSuggestedMovie[] | ErrorResponse | undefined
}
export default function SuggestedMovieArea(props: SuggestedMovieAreaProps){
    console.log(props.suggestedMovies)
    if(props.suggestedMovies == undefined){
        return
    }
    if("err" in props.suggestedMovies){
        return <Typography>{props.suggestedMovies.err}</Typography>
    }

    return (
        <Container>
            <Typography variant="h2">Suggestions</Typography>
            {props.suggestedMovies.map((movie) => (
                        <SuggestedMovieCard
                            movie={movie}
                            key={movie.imdbID}
                        />
                    ))}
        </Container>
    )
}