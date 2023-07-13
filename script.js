// VARS

var navBtns = document.querySelectorAll('.nav-btn');
var goBtn = document.querySelector('.go-btn');
var nextBtn = document.querySelector('.nav-btn.next');
var prevBtn = document.querySelector('.nav-btn.prev');
var slideCover = document.querySelector('.slide.cover');
var slideModule = document.querySelector('.slide.module');
var slideA = document.querySelector('.slide-a');
var slideB = document.querySelector('.slide-b');
var slideC = document.querySelector('.slide-c');
var slideD = document.querySelector('.slide-d');

var slides = [slideA, slideB];
let firstSlide = false;
let lastSlide = false;

// FUNCTIONS

//// handleGo

function handleGo() {
    slideCover.classList.toggle('is-active');
    slideModule.classList.toggle('is-active');
};

//// handelNavBtns

function handelNavBtns() {
    if (firstSlide) {
        prevBtn.classList.remove('is-active');
        nextBtn.classList.add('is-active');
    } else if (lastSlide) {
        prevBtn.classList.add('is-active');
        nextBtn.classList.remove('is-active');
    } else {
        prevBtn.classList.add('is-active');
        nextBtn.classList.add('is-active');
    }
};

//// handleSlides
function handleSlides(slide) {
    if (slide === slideA) {
        firstSlide = true;
    } else if (slide === slideB) {
        lastSlide = true;
    } else {
        firstSlide = false;
        lastSlide = false;
    }
}

//// slideNavigation
function slideNavigation() {
    // get clicked button
    var clickedBtn = this;

    // get current slide
    var currentSlide = document.querySelector('.slide.module .slide.is-active');

    // get current slide index
    var currentSlideIndex = slides.indexOf(currentSlide);

    // get next slide
    var nextSlide = slides[currentSlideIndex + 1];

    // get prev slide
    var prevSlide = slides[currentSlideIndex - 1];


    if (clickedBtn === nextBtn) {
        // remove current slide
        currentSlide.classList.remove('is-active');
        // add next slide
        nextSlide.classList.add('is-active');
        // check if last slide
        handleSlides(nextSlide);

    } else if (clickedBtn === prevBtn) {
        // remove current slide
        currentSlide.classList.remove('is-active');
        // add prev slide
        prevSlide.classList.add('is-active');
        // check if first slide
        handleSlides(prevSlide);
    };

    // handle NavBtns

    handelNavBtns();


}

// LISTENERS
goBtn.addEventListener('click', handleGo);
navBtns.forEach(btn => btn.addEventListener('click', slideNavigation));


// INTERACT JS

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: '.test-container',
                endOnly: true
            })
        ],
        // enable autoScroll
        // autoScroll: true,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,

            // call this function on every dragend event
            end(event) {
                var textEl = event.target.querySelector('p')

                textEl && (textEl.textContent =
                    'moved a distance of ' +
                    (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                        Math.pow(event.pageY - event.y0, 2) | 0))
                        .toFixed(2) + 'px')
            }
        }
    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.draggable',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget
        var dropzoneElement = event.target

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
        draggableElement.classList.add('dragged-in')

        document.querySelector('.task-update #taskA').classList.add('done')
        document.querySelector('.task-title .taskA').classList.add('done')
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.classList.remove('dragged-in')
        event.relatedTarget.classList.remove('dropped')

        document.querySelector('.task-update #taskA').classList.remove('done')
        document.querySelector('.task-title .taskA').classList.remove('done')
    },
    ondrop: function (event) {
        // event.relatedTarget.textContent = 'Dropped'
        event.relatedTarget.classList.add('dropped')
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})

interact('.drag-drop')
    .draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        // dragMoveListener from the dragging demo above
        listeners: { move: dragMoveListener }
    })


// Rotate Buttons

var rotateLeftBtn = document.getElementById('rotateL');
var rotateRightBtn = document.getElementById('rotateR');
var rotateItem = document.querySelector('.draggable img');



// function getCurrentRotation(el) {
//     // Access DOM element object
//     // const el = document.getElementById('el');
//     // Variable to hold the current angle of rotation
//     let rotation = 0;
//     // How much to rotate the image at a time
//     const angle = 90;
//     function rotateImage() {
//         // Ensure angle range of 0 to 359 with "%" operator,
//         // e.g., 450 -> 90, 360 -> 0, 540 -> 180, etc.
//         rotation = (rotation + angle) % 360;
//         el.style.transform = `rotate(${rotation}deg)`;
//     }
// }

let rotation, rotationNew;
function handleRotate() {
    if (rotateItem.classList.contains('rotated')) {
        rotation = rotationNew;
    } else {
        rotation = -35;
    }
    const angle = 5;

    // if clicked btn is rotateLeftBtn
    if (this === rotateLeftBtn) {
        rotateItem.classList.add('rotated');
        rotation = (rotation - angle) % 360;

    } else if (this === rotateRightBtn) {
        rotateItem.classList.add('rotated');
        rotation = (rotation + angle) % 360;

    }
    rotationNew = rotation;
    console.log(rotation);
    rotateItem.style.transform = `rotate(${rotation}deg)`;

    if (rotation === 0) {
        document.querySelector('.task-update #taskB').classList.add('done');
        document.querySelector('.task-title .taskB').classList.add('done');
    } else {
        document.querySelector('.task-update #taskB').classList.remove('done');
        document.querySelector('.task-title .taskB').classList.remove('done');
    }
}

rotateLeftBtn.addEventListener('click', handleRotate);
rotateRightBtn.addEventListener('click', handleRotate);