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
  malId: number
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
export const addToWatchLater = async (
  title: string,
  imageUrl: string,
  malId: number
) => {
  const data = {
    title,
    imageUrl,
    malId,
  };

  try {
    await toast.promise(
      fetch("/api/watch-later", {
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }),
      {
        loading: "Saving to watch later...",
        success: "Anime saved successfully",
        error: (err) => `Something went wrong: ${err.toString()}`,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const themeConverter = (theme: string, isBg: boolean, shade: string) => {
  switch (theme) {
    case "blue":
      return isBg ? `bg-blue-${shade}` : `text-blue-${shade}`;
    case "emerald":
      return isBg ? `bg-emerald-${shade}` : `text-emerald-${shade}`;
    case "violet":
      return isBg ? `bg-violet-${shade}` : `text-violet-${shade}`;
    case "pink":
      return isBg ? `bg-pink-${shade}` : `text-pink-${shade}`;
    case "yellow":
      return isBg ? `bg-yellow-${shade}` : `text-yellow-${shade}`;
    case "lime":
      return isBg ? `bg-lime-${shade}` : `text-lime-${shade}`;
    default:
      break;
  }
};

export const getSeason = (month:number) => {
  if (month >= 3 && month <= 5) {
    return "spring";
  }

  if (month >= 6 && month <= 8) {
    return "summer";
  }

  if (month >= 9 && month <= 11) {
    return "fall";
  }

  // Months 12, 01, 02
  return "winter";
};
