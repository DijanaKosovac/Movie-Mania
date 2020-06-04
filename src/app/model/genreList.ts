import { Genre } from './genre';
export class GenreList {
    genreList: Genre[];

    constructor(obj?: any) {
        this.genreList = obj && obj.map(data => {
            return new Genre(data);
        }) || [];
    }
}