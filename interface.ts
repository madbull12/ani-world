export interface Anime {
    mal_id:number;
    images:JPG
    trailer:Trailer;
    title:string;
    title_english:string;
    title_japanese:string;
    type:string;
    source:string;
    episodes:number;
    status:string;
    airing:boolean;
    aired:Aired;
    duration:string;
    rating:string;
    score:number;
    scored_by:number;
    rank:number;
    popularity:number;
    members:number;
    favorites:number;
    season:string;
    year:number;
    synopsis:string;
    background:string;

}

interface Aired {
    from:string;
    to:string;
    prop:{
        from:{
            day:number
            month:number;
            year:number;
        },
        to:{
            day:number;
            month:number;
            year:number;
        }
    }
}


interface Trailer  {
    youtube_id:string;
    url:string;
    embed_url:string;
}

interface JPG {
    jpg :{
        image_url:string;
        small_image_url:string;
        large_image_url:string;
    }

}

export interface IRow {
    items:Anime[];
    title:string;
}