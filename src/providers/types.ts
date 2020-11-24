import React from 'react';

export type Props = {
    children: React.PropsWithChildren<{}>;
};

export type SearchItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export type Movie = {
    Response: string;
    Search: SearchItem[];
    totalResults: string;
};

export type CounterContext = {
    movies: undefined | Movie;
    setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
    userMovie: UserMovie | undefined;
    setUserMovie: React.Dispatch<React.SetStateAction<UserMovie | undefined>>;
    loading: string | undefined | boolean;
    setLoading: React.Dispatch<React.SetStateAction<string | undefined | boolean>>;
    errors: Error | undefined;
    setErrors: React.Dispatch<React.SetStateAction<Error | undefined>>;
};

export type Ratings = {
    Source: string;
    Value: string;
}

export type UserMovie = {
    Actors: string;
    Awards: string;
    BoxOffice: string;
    Country: string;
    DVD: string;
    Director: string;
    Genre: string;
    Language: string;
    Metascore: string;
    Plot: string;
    Poster: string;
    Production: string;
    Rated: string;
    Ratings: Ratings[];
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Website: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
}
