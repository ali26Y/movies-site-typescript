/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useCallback, Fragment, FC } from 'react';
import { css } from "emotion";
import debounce from 'debounce-promise';
import { SearchContext } from '../providers/movieWrapper';
import { useMovieLookup } from '../utils/useMovieLookup';
import { Cards } from './cards';
import { Pagination } from './pagination';
import { input_fied_styles, input_field_wrapper, navbar_styles } from '../styling';

import { CounterContext} from '../providers/types';

export const Navbar: FC = () => {
    const [value, setValue] = useState<string>('');
    const [searchInput, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const { movies, errors, loading } = useContext<CounterContext>(SearchContext);

    useMovieLookup( value.trim(), page  );
    const totalPages = movies && movies.totalResults ? (parseInt(movies.totalResults) % 10) === 0 ? (parseInt(movies.totalResults)/10) :  Math.floor(parseInt(movies.totalResults)/10) + 1: undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debounceFetch(e.target.value);
    };

    const debounceFetch = useCallback(
        debounce((value) => {
            setValue(value);
        }, 400),
        []
    );

    return (
        <div className={navbar_styles}>
            <div className={input_field_wrapper}>
                <input 
                    value={searchInput}
                    onChange={handleChange}
                    placeholder="Search Here"
                    className={input_fied_styles}
                />
            </div>
            { loading === 'sidebar' ? <p className={css`text-align: center`}>loading...</p> 
                : errors ? (
                    <Fragment>
                        <h5 className={css`padding-left: 15px;`}>Error:</h5>
                        <p className={css`text-align: center;`}>{errors.message}</p> 
                    </Fragment>
                ) : movies && movies.Search ? 
                    <Fragment>
                        <Cards />
                        {parseInt(movies.totalResults) > 10 && (
                            <Pagination
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        )}
                    </Fragment>
                : ''
            }
        </div>
    )
};
