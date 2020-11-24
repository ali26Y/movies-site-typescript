import React, { useContext, useState, FC } from 'react';
import { css } from "emotion";
import { SearchContext} from '../providers/movieWrapper';
import { useSingleMovie } from '../utils/useSingleMovie';
import { card_with_image_styles, card_without_image_styles, full_width } from '../styling';

import { SearchItem, CounterContext } from '../providers/types';

type Props = {
    movie: SearchItem
};

const Info: FC<Props> = ({ movie }: Props) => (
    <div>
        <h5 className={css`margin: 0 0 10px 0;`}>{movie.Title}</h5>
        <p className={css`margin: 0;`}>{movie.Year}</p>
    </div>
)

export const Cards: FC = () => {
    const { movies } = useContext<CounterContext>(SearchContext);

    const [currentMovie, setCurrentMovie] = useState<SearchItem[] | string>('');
    const updateMovie = (movie: SearchItem) => {
        setCurrentMovie(movie.imdbID);
    }

    useSingleMovie(currentMovie);

    return (
        <div className={css`overflow-y: scroll; height: calc(100vh - 260px)`}>
            {
                movies && movies.Search.map(movie => movie.Poster !== 'N/A' ? (
                    <div key={movie.imdbID} onClick={() => updateMovie(movie)}
                        className={card_with_image_styles}>
                        <div>
                            <img src={movie.Poster} alt="movie poster" className={full_width}/>
                        </div>
                        <Info movie={movie} />
                    </div>
                ) : (
                    <div key={movie.imdbID} onClick={() => updateMovie(movie)} 
                        className={card_without_image_styles}>
                        <Info movie={movie} />
                    </div>
                ))
            }
        </div>
    );
};
