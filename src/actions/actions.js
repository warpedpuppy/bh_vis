export const SET_Movies = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export function setMovies(value) {
    return { type: SET_Movies, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}