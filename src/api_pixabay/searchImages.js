import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '37098068-44e27cfa1b1d9a8c1939cc69f';

async function searchImages(value, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
  return response;
}

export default searchImages