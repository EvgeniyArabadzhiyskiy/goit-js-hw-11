import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '26298929-dc8db63efad38f2c4177a32d6';

export default class Gallery {
  constructor() {
    this.searcQuery = '';
    this.page = 1;
    this.totalHits = 0;
    this.totalResponses = 0;
    this.fetching = true;
    this.isPossibleRequest = true;
    this.isActive = true;
  }

  async  fetchItems() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searcQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    this.incrementPage()
    this.fetching
    return (await axios(url)).data;

  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
    this.totalResponses = 0;
    this.isPossibleRequest = false;
    this.isActive = true;
  }

  getQuantityOfRespons(items) {
    this.totalHits = items.totalHits;
    this.totalResponses += items.hits.length;
    this.totalHits -= this.totalResponses;
    
    console.log("Array", this.totalResponses);
    console.log('ОСТАТОК ФОТО', this.totalHits);
  }
}