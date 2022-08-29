import toast from "react-hot-toast";




export const addFavorite = async(title:string,imageUrl:string,malId:number,email:any) =>{
    const data = {
        title,
        imageUrl,
        userEmail:email,
        malId
    }
    try {
        await fetch("/api/favorite",{
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
                },
            method:"POST"
        })
    } catch(err) {
        console.log(err);
    }
}

export const addToFavourite = async(title:string,imageUrl:string,mal_id:number,email:any) => {

    await toast.promise(addFavorite(title,imageUrl,mal_id,email),{
        loading:"Saving to favorite...",
        success:"Saving anime successfully",
        error:(err)=>`Something went wrong: ${err.toString()}`
    });
  
 
}