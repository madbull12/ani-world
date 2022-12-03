import toast from "react-hot-toast";

// export const addFavorite = async (
//   title: string,
//   imageUrl: string,
//   malId: number,
// ) => {
//   const data = {
//     title,
//     imageUrl,
//     // userEmail: email,
//     malId,
//   };
//   try {
//     await fetch("/api/favorite", {
//       body: JSON.stringify(data),
//       headers: {
//         "Content-type": "application/json",
//       },
//       method: "POST",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const addToFavourite = async (
  title: string,
  imageUrl: string,
  malId: number,
) => {
  const data = {
    title,
    imageUrl,
    malId,
  };

  try {
    await toast.promise(
      fetch("/api/favorite", {
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }),
      {
        loading: "Saving to favorite...",
        success: "Anime saved successfully",
        error: (err) => `Something went wrong: ${err.toString()}`,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
