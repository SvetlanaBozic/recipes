

$('.banner button').on('click',() => {
    document.querySelector('.banner').style.display = 'none';
    document.querySelector('.slideshow-wrapper').style.cssText = 'opacity: 1; visibility: visible';
    document.querySelector('.slideshow').style.animation = 'slideshow 24s infinite';
});


$('.site-menu').on('click', () => {
    document.querySelector('.nav-wrapper').classList.toggle('change');
});



