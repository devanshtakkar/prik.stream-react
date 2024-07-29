export interface OMDbSearch {
    Search: Array<SingleMovieRecord>;
    totalResults: string;
    Response: "True" | "False";
    Error?: string;
}

export interface ErrorResponse {
    err: string;
}

interface Rating {
    Source: string;
    Value: string;
}

export interface SingleMovieRecord {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface GptSuggestedMovie extends SingleMovieRecord {
    brief_reason: string;
}

export interface SavedMovieRes {
    id: number;
    title: string;
    year: string;
    rated: null | string;
    released: null | string;
    runtime: null | string;
    genre: null | string;
    director: string;
    writer: null | string;
    actors: null | string;
    plot: null | string;
    language: null | string;
    country: null | string;
    awards: null | string;
    poster: null | string;
    metascore: null | string;
    imdbRating: null | string;
    imdbVotes: null | string;
    imdbID: string;
    type: null | string;
    dvd: null | string;
    boxOffice: null | string;
    production: null | string;
    website: null | string;
    response: null | string;
    brief_reason: string;
    userId: number;
}

export interface UserDataRes {
    id: number;
    email: string;
    name: string;
    password: string;
    savedMovies: SavedMovieRes[];
}
