const accessKey = "XJ9SYCDs7jbaHpWrEaNJF-M736c4uDIpD9F3g1P9tuo"; // Replace with your Unsplash access key
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const query = input.value;
  if (query.trim() === '') {
    alert('Please enter a search term');
    return;
  }
  
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${accessKey}`);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

function displayImages(images) {
  searchResults.innerHTML = '';

  images.forEach(image => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    const img = document.createElement('img');
    img.src = image.urls.small;
    img.alt = image.alt_description;

    const imageLink = document.createElement('a');
    imageLink.href = image.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = 'search-results';

    imageWrapper.appendChild(img);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
}