import api, { apiKey } from "./movieApi";

export function posterCheck(poster) {
  const noImg =
    "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";

  if (poster === null || poster === undefined) {
    return noImg;
  } else {
    return "https://image.tmdb.org/t/p/original" + poster;
  }
}

export async function getInfo(id, type) {
  try {
    const response = await api.get(`/${type}/${id}?api_key=${apiKey}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getVideo(id, type) {
  try {
    const response = await api.get(`/${type}/${id}/videos?api_key=${apiKey}`);
    const result = response.data.results.filter(
      (item) => item.type === "Trailer" && item.site === "YouTube"
    )[0];
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function searchData(type, keyWord, page) {
  try {
    const response = await api.get(
      `/search/${type}?api_key=${apiKey}&query=${keyWord}&page=${page}`
    );
    const result = response.data.results;
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getNumberMovie_tv(type, keyWord) {
  try {
    const response = await api.get(
      `/search/${type}?api_key=${apiKey}&query=${keyWord}`
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}
