import React, { useState, createContext } from 'react';
// Types
import { Props, CounterContext, Movie, UserMovie } from './types';

export const SearchContext = createContext<CounterContext>({} as CounterContext);

export const SearchProvider = ({ children }: Props ) => {
    const [movies, setMovie] = useState<Movie | undefined>(undefined);
    const [userMovie, setUserMovie] = useState<UserMovie | undefined>(undefined);
    const [errors, setErrors] = useState<Error | undefined>(undefined);
    const [loading, setLoading] = useState<string | undefined | boolean>(undefined);

    return (
        <SearchContext.Provider 
            value={{   
                movies, 
                setMovie, 
                errors, 
                setErrors,
                loading, 
                setLoading, 
                userMovie, 
                setUserMovie 
        }}>
            {children}
        </SearchContext.Provider>
    );
};
