
////------------------- При помощи Безконечного скролла --------------------------------------


// import './css/styles.css';
// import axios from 'axios';
// import galleryTpl from './templates/gallery.hbs'
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.css';
// import Gallery from './js/fetch-items';


// const refs = {
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('[type="text"]'),
//   gallery: document.querySelector('.gallery'),
//   loadMore: document.querySelector('.load-more'),

// };

// refs.loadMore.classList.add('is-hidden');
// refs.form.addEventListener('submit', onSubmit);

// const gallery = new Gallery()


// function onSubmit(evt) {
//   evt.preventDefault();

//   window.addEventListener('scroll', onScroll);

//   const form = evt.target
//   gallery.searcQuery = form.elements.searchQuery.value;

//   gallery.resetPage();
//   createItems();
  
//   refs.gallery.innerHTML = '';

// }

// function createItems() {
//   gallery.fetchItems().then(items => {
//     gallery.isPossibleRequest = true;
//     refs.loadMore.classList.add('is-hidden');
   
//     showsEndOfPictures(items);
//     showNotification(items)
//     createCards(items)
  
//   })
//   .catch(error => {
//     console.log(error);
//     Notify.failure(`${error}`)
//   })
//   .finally(() => gallery.fetching = true)
// }

// function onScroll() {
//   const documentRect = document.documentElement.getBoundingClientRect();
//   const CLIENT_HEIGHT = document.documentElement.clientHeight;

//   if ((documentRect.bottom < CLIENT_HEIGHT + 700) && gallery.fetching && gallery.isPossibleRequest) {
//     gallery.fetching = false;
//     createItems();
//   }

//   if (documentRect.bottom < 700 && documentRect.bottom > 500 && gallery.isActive && gallery.totalHits <= 0) {
//     gallery.isActive = false
//     Notify.failure("We're sorry, but you've reached the end of search results.");
//   }
  
// }

// function createCards(items) {
//   const markupGalleryCards = galleryTpl(items.hits);
//   refs.gallery.insertAdjacentHTML('beforeend',markupGalleryCards) ;
//   var lightbox = new SimpleLightbox('.gallery a');

// }

// function showsEndOfPictures(items) {
//   gallery.getQuantityOfRespons(items)

//   if (gallery.totalHits <= 0) {
//     gallery.isPossibleRequest = false
//   } 
 
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

////=======================================================================================================





























