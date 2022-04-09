
////------------------- При помощи Безконечного скролла --------------------------------------


import './css/styles.css';
import axios from 'axios';
import galleryTpl from './templates/gallery.hbs'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.css';
import Gallery from './js/fetch-items';


const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[type="text"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  sentinel: document.querySelector('#sentinel'),

};

refs.loadMore.classList.add('is-hidden');
refs.form.addEventListener('submit', onSubmit);

const gallery = new Gallery()


function onSubmit(evt) {
  evt.preventDefault();

  const form = evt.target
  gallery.searcQuery = form.elements.searchQuery.value;

  gallery.resetPage();
  createItems();
  
  refs.gallery.innerHTML = '';
  refs.sentinel.textContent = '';
}

function createItems() {
  gallery.fetchItems().then(items => {
    gallery.isPossibleRequest = true;
    refs.loadMore.classList.add('is-hidden');
   
    showsEndOfPictures(items);
    showNotification(items)
    createCards(items)
  
  })
  .catch(error => {
    console.log(error);
    Notify.failure(`${error}`)
  })
  .finally(() => gallery.fetching = true)
}



function createCards(items) {
  const markupGalleryCards = galleryTpl(items.hits);
  refs.gallery.insertAdjacentHTML('beforeend',markupGalleryCards) ;
  var lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function showsEndOfPictures(items) {
  gallery.getQuantityOfRespons(items)

  if (gallery.totalHits <= 0) {
    gallery.isPossibleRequest = false
  } 
 
}

function showNotification(items) {
  if (gallery.page === 2 && items.totalHits !== 0) {
    Notify.success(`Hooray! We found ${items.totalHits} images.`);
  }

  if (items.total === 0) {
    refs.loadMore.classList.add('is-hidden');
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }

  if ( gallery.totalHits <= 0) {
    // gallery.isActive = false
    refs.sentinel.textContent = "We're sorry, but you've reached the end of search results."
  }
}


function onEntry(entries) {

  entries.forEach(entry => {
    if (entry.isIntersecting && gallery.searcQuery !== '' && gallery.isPossibleRequest) {
      createItems()
    }

  })
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});

observer.observe(refs.sentinel);


////=======================================================================================================










//// ------------------- При помощи Button Load More--------------------------------------

// import './css/styles.css';
// import axios from 'axios';
// import galleryTpl from './templates/gallery.hbs'
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.css';


// const BASE_URL = `https://pixabay.com/api/`;
// const API_KEY = '26298929-dc8db63efad38f2c4177a32d6';


// const refs = {
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('[type="text"]'),
//   gallery: document.querySelector('.gallery'),
//   loadMore: document.querySelector('.load-more'),

// };

// refs.loadMore.classList.add('is-hidden');

// refs.form.addEventListener('submit', onSubmit);
// refs.loadMore.addEventListener('click', onloadMore);



// class Gallery {
//   constructor() {
//     this.searcQuery = '';
//     this.page = 1;
//     this.totalHits = 0;
//     this.totalResponses = 0;
//     this.fetching = true;
    
//   }

//   async  fetchItems() {
//     const url = `${BASE_URL}?key=${API_KEY}&q=${this.searcQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
//     this.incrementPage()
//     this.fetching
//     return (await axios(url)).data;

//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//     this.totalResponses = 0;
//   }

//   getQuantityOfRespons(items) {
//     this.totalHits = items.totalHits;
//     this.totalResponses += items.hits.length;
//     this.totalHits -= this.totalResponses;
    
//     console.log("Array", this.totalResponses);
//     console.log('ОСТАТОК ФОТО', this.totalHits);
//   }
// }

// const gallery = new Gallery()


// function onSubmit(evt) {
//   evt.preventDefault();

//   const form = evt.target
//   gallery.searcQuery = form.elements.searchQuery.value
//   refs.loadMore.classList.add('is-hidden');
//   gallery.resetPage();
//   createItems();
//   refs.gallery.innerHTML = '';
//   form.reset();

// }

// async function createItems() {
//   try {
//     const items = await gallery.fetchItems();

//     refs.loadMore.classList.remove('is-hidden');
//     refs.loadMore.textContent = 'load-more';
//     refs.loadMore.style.backgroundColor = 'white';

//     showsEndOfPictures(items);
//     showNotification(items);
//     createCards(items);
    
//   } catch (error) {
//     console.log(error);
//     Notify.failure(`${error}`);
//   } 
  
// }

// function createCards(items) {
//   const markupGalleryCards = galleryTpl(items.hits);
//   refs.gallery.insertAdjacentHTML('beforeend',markupGalleryCards) ;
//   var lightbox = new SimpleLightbox('.gallery a');
//   lightbox.refresh();
// }

// function onloadMore() {
//   refs.loadMore.textContent = 'Loading...';
//   refs.loadMore.style.backgroundColor = 'red';
//   createItems();
//   scrollsGalerry();
// }


// function showsEndOfPictures(items) {
//   gallery.getQuantityOfRespons(items)
  
//   if (gallery.totalHits <= 0 ) {
//     refs.loadMore.classList.add('is-hidden');
//   } 
// }


// function scrollsGalerry() {
//   setTimeout(() => {
//     const { height: cardHeight } = document
//     .querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();

//     const options = {
//       top: (cardHeight + 20) * 2 ,
//       behavior: "smooth",
//     }
    
//     window.scrollBy(options);
//   }, 1000);
// }

// function showNotification(items) {
//   if (gallery.page === 2 && items.totalHits !== 0) {
//     Notify.success(`Hooray! We found ${items.totalHits} images.`);
//   }

//   if (items.total === 0) {
//     refs.loadMore.classList.add('is-hidden');
//     Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     return
//   }
// }

//=======================================================================================================


































// function onScroll() {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   const CLIENT_HEIGHT = document.documentElement.clientHeight;

//   if ((documentRect.bottom < CLIENT_HEIGHT + 1000) && gallery.fetching && gallery.isPossibleRequest) {
//     gallery.fetching = false;
//     createItems();
//   }

//   if (documentRect.bottom < 700 && documentRect.bottom > 500 && gallery.isActive && gallery.totalHits <= 0) {
//     gallery.isActive = false
//     Notify.failure("We're sorry, but you've reached the end of search results.");
//   }
  
// }