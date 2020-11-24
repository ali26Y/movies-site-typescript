import { useEffect, useContext } from "react";
import { SearchContext} from '../providers/movieWrapper';
import { Client } from './apiClient';

import { CounterContext, SearchItem } from '../providers/types';

export const useSingleMovie = (movieId?: SearchItem[] | string) => {
    const { setUserMovie, setErrors, setLoading } = useContext<CounterContext>(SearchContext);

    useEffect(() => {
        const lookupMovie = async () => {
            try {
                if (movieId && movieId.length) {
                    setLoading('content');
                    setErrors(undefined);
                    const data = await Client(`i=${movieId}`, {})
                    if (data) {
                        setUserMovie(data);
                        setLoading(false);
                    }
                }
            } catch (err) {
                setErrors(err);
                setLoading(false);
                setUserMovie(undefined);
            }
        }
        lookupMovie();
    }, [movieId, setErrors, setLoading, setUserMovie]);

  return;
};
