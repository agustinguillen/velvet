export interface RecomendadasResponse {
    page:          number;
    results:       Resultado[];
    total_pages:   number;
    total_results: number;
}

export interface Resultado {
    adult:             boolean;
    backdrop_path:     string;
    genre_ids:         number[];
    original_language: OriginalLanguage;
    original_title:    string;
    poster_path:       string;
    video:             boolean;
    vote_average:      number;
    id:                number;
    overview:          string;
    release_date:      Date;
    vote_count:        number;
    title:             string;
    popularity:        number;
}

export enum OriginalLanguage {
    Da = "da",
    En = "en",
}
