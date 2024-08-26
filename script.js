const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const aboutDiv = document.getElementById("about-div");
let isScrolling;

let count = 5;
const apiKey = "j08brbAOMk1BtcsKMTkLkjaaMMXmtWTrR6PtrtfFzmc";
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photosArray = [];
let ready = false;
let imagesLoaded = 0;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded == photosArray.length) {
    count = 10;
    ready = true;
    loader.hidden = true;
    console.log("ready");
  }
}
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function displayPhotos() {
  imagesLoaded = 0;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    image.addEventListener("load", () => {
      imageLoaded();
    });
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}
async function getPhotos() {
  try {
    const response = await fetch(unsplashUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log("fetching more photos");
    ready = false;
    getPhotos();
  }

  aboutDiv.classList.remove("visible");
  aboutDiv.classList.add("hidden");

  clearTimeout(isScrolling);

  isScrolling = setTimeout(() => {
    aboutDiv.classList.remove("hidden");
    aboutDiv.classList.add("visible");
  }, 200); // Adjust the delay time as neede
});
getPhotos();
