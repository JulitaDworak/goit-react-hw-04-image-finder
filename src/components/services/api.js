import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const KEY = '35294695-6bfc4b24db5372eaae3354bab';

export const fetchPhotosWithQuery = async (searchValue, page) => {
  const response = await axios.get(API_URL, {
    params: {
      key: KEY,
      q: searchValue,
      page: page,
      per_page: 12,
    },
  });

  return response.data.hits;
};