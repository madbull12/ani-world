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



export interface IMain {
    seasonsNow:Anime[];
    seasonYear:Anime[];
    seasonsUpcoming:Anime[];
    // animeNews:Anime[];
}

export interface Genre {
    mal_id:0;
    type:string;
    name:string;
    
}

export interface AnimeDetailsProps extends Anime {
    genres:Genre[];
    studios:Genre[];
    broadcast:{
        day:string;
        time:string;
        timezone:string;
        string:string;
    }

}

export interface Recommendation {
    entry:Entry
    votes:number;

}

export interface Entry extends Anime{
    images:JPG;
    mal_id:number;
    title:string;
}

export interface Stats {
    watching:number;
    completed:number;
    on_hold:number;
    dropped:number;
    plan_to_watch:number;
    total:number;
    scores:Score[]
}

interface Score {
    votes:number;
    score:number;
    percentage:number;
}

interface Studio {

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