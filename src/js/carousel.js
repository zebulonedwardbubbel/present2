import Flickity from 'flickity';

function carousel() {
    const carousel = document.querySelector('.c-carousel__inner');
    const flkty = new Flickity(carousel, {
        imagesLoaded: true,
        percentPosition: false
    });

    const imgs = carousel.querySelectorAll('.c-carousel__cell img');
    // get transform property
    const docStyle = document.documentElement.style;
    const transformProp = typeof docStyle.transform === 'string' ?
        'transform' : 'WebkitTransform';

    flkty.on('scroll', () => {
        flkty.slides.forEach((slide, i) => {
            const img = imgs[i];
            const x = (slide.target + flkty.x) * -1 / 3;
            img.style[transformProp] = `translateX(${x}px)`;
        });
    });

    // // element argument can be a selector string
    // //   for an individual element
    // const flkty = new Flickity( '.main-carousel', {
    //   // options
    // });
}

export default carousel;
