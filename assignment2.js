"use strict";
/*    

Assignment #2 based on Chapter 5 case 

Deqa Yusuf 
Student #:301320314
      
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; // TODO figure out title
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   
   let favoritesBox = document.createElement("div");
   favoritesBox.id = "favoriteImages";
   galleryBox.appendChild(favoritesBox);

   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {

      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);

      //add to favourite button here  > on click calls the function addToFavourites 

      let addToFavoritesButton = document.createElement("button");
      addToFavoritesButton.id = "addToFavoritesButton";
      addToFavoritesButton.textContent = "Add to Favorites";
      addToFavoritesButton.onclick = addToFavorites;
      figureBox.appendChild(addToFavoritesButton);

      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }


// add to favourite function 

   function addToFavorites() {

      let favoriteImages = document.getElementById("favoriteImages");
      let slideImage = this.parentNode.querySelector("img");
      let slideImageCount = favoriteImages.querySelectorAll("img").length;
    
      if (slideImageCount >= 5) {

        alert("You can only add up to 5 images to favorites! Please remove a photo!");
        return;
      }
    
      let imagesInFavorites = favoriteImages.querySelectorAll("img");

      for (let i = 0; i < imagesInFavorites.length; i++) {

        if (imagesInFavorites[i].src === slideImage.src) {

          alert("You can't add the same image twice!");
          return;
        }
      }
    
      let favoriteImage = slideImage.cloneNode();
      let removeButton = document.createElement("button");
      removeButton.id = "removeButton"
      removeButton.textContent = "Remove Photo!";
      removeButton.onclick = function() {
        favoriteImages.removeChild(favoriteImageContainer);
      }
    
      let favoriteImageContainer = document.createElement("div");
      favoriteImageContainer.appendChild(favoriteImage);
      favoriteImageContainer.appendChild(removeButton);
    
      favoriteImages.appendChild(favoriteImageContainer);

    }
    
   }    
