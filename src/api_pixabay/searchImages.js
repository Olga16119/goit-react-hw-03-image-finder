const BASE_URL = 'https://pixabay.com/api/';

async function searchImages(value, page) {
  const params = new URLSearchParams({
    key: '37098068-44e27cfa1b1d9a8c1939cc69f',
    q: value,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log('Error fetching ', error);
  }
}

export default searchImages;
