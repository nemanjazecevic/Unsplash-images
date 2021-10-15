const apiRoot = "https://api.unsplash.com";
const accessKey = "3utUDnZOgISJBUwb41UfzZ3KZD7fPuCklAglnOvoEjU";
const count = 8;
const loader = document.querySelector('#loader-img');

let imageGrid = document.querySelector('.image-grid');

let i = 0;
const addToDom = photos => {
    photos.forEach(photo => {
        let el = document.createElement("div");
        el.classList.add('image-item');
        el.classList.add(`${photo.id}`);
        if (photo.description === null) {
            photo.description = "This image doesn't have description";
        }
        el.innerHTML =
            `
            <p class="user"><img class="avatar" src="${photo.user.profile_image.small}"> ${photo.user.username}</p>
            <img id="${photo.id}" class="${photo.id} image" src="${photo.urls.regular}" alt="${photo.description}">
            <div class="info">
                <div class="likes-downloads">
                    <p class="likes"><i class="fas fa-heart"></i> ${photo.likes}</p>
                    <p class="downloads"><i class="fas fa-download"></i> ${photo.downloads}</p>
                </div>
                
                <div id="${++i}" class="more-info">
                    <p class="unsplashLink">Check it on <a target="_blank" href="https://unsplash.com/photos/${photo.id}?client_id=${accessKey}">unsplash.com</a></p>
                    
                    ${photo.user.portfolio_url ? `<p class="portfolio">Take a look at my<a href="${photo.user.portfolio_url}" target="_blank"> PORTFOLIO</a></p>` : `<p></p>`} 
                    ${photo.user.instagram_username ? `<p class="instagram">Instagram: <a href="https://www.instagram.com/${photo.user.instagram_username}" target="_blank"> ${photo.user.instagram_username}</a></p>` : `<p></p>`}
                    ${photo.user.twitter_username ? `<p class="twitter">Twitter: <a href="https://www.twitter.com/${photo.user.twitter_username}" target="_blank"> ${photo.user.twitter_username}</a></p>` : `<p></p>`}
                    
                    
                    
                </div>
                
            </div>
            `;

        imageGrid.appendChild(el);
        el.addEventListener("click", (e) => {
            if (e.path[0].classList[1] === "image") {
                const content = photos.find(element => element.id === el.classList[1]);
                openModal(content);
            }
        })
    });

};
function moreInfo(id) {
    document.getElementById(id).style.display = "block";
}

const loadMore = () => {

    loader.style.display = "block";
    fetch(`${apiRoot}/photos/random?per_page=8&client_id=${accessKey}&count=${count}`)
        .then((res) => {
            return res.json();
        })
        .then(data => {
            let photos = [];
            // console.log(data);
            photos.push(...data);
            addToDom(photos);
            loader.style.display = "none";
        })
        .catch(err => {
            console.log(err);
        });
};

window.addEventListener("load", () => {
    loadMore();
})
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
        loadMore();
    }
});


let lightbox = document.querySelector(".lightbox");
let lightboxImg = document.querySelector(".lightbox img");
function openModal(imgData) {
    lightbox.classList.add('active')
    lightboxImg.src = imgData.urls.regular;
}
window.addEventListener('keyup', (e) => {
    if (e.keyCode === 27) lightbox.classList.remove('active')
})
lightbox.addEventListener('click', (e) => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

let gridView = document.querySelector(".fa-th");
let listView = document.querySelector(".fa-bars");
gridView.addEventListener("click", () => {
    listView.style.opacity = 0.3;
    gridView.style.opacity = 1;
    if (document.querySelector("body").classList.contains("listView")) {
        document.querySelector("body").classList.remove("listView");
    }
})
listView.addEventListener("click", () => {
    listView.style.opacity = 1;
    gridView.style.opacity = 0.3;
    if (!document.querySelector("body").classList.contains("listView")) {
        document.querySelector("body").classList.add("listView");
    }

})
window.addEventListener('resize', () => {
    if (window.innerWidth < 800) {
        document.querySelector("body").classList.remove("listView");
        listView.style.opacity = 0.3;
        gridView.style.opacity = 1;
    }
});
