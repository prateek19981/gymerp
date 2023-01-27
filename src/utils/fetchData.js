import axios from "axios";

export const exerOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_FIT_NATION_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};
export const fetchData = async (url, options) => {
  try {
    const data = await axios.get(url, options);

    return data.data;
  } catch (err) {
    console.log(err);
  }
};
