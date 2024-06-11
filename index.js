

/**
 * Reset the scroll position of elements on site reload
 */
window.addEventListener('beforeunload', function(event) {
    // Scroll to the top of the page
    // TODO: Add this again
    //window.scrollTo(100, 0);
});

function getTotalWidth(element) {
  // Store the current width
  const originalWidth = element.style.width;
  
  // Temporarily remove width constraint
  element.style.width = 'auto';
  
  // Get the total width
  const totalWidth = element.offsetWidth;
  
  // Revert the changes
  element.style.width = originalWidth;
  
  return totalWidth;
}

  function centerCurrent() {
    var testimonialContainers = document.getElementsByClassName('testimonials-row');
    var currentTestimonials = document.querySelectorAll('.testimonial.current');

    console.log(testimonialContainers);
    console.log(currentTestimonials);

    if (testimonialContainers.length && currentTestimonials.length) {
        var testimonialContainer = testimonialContainers[0];
        var currentTestimonial = currentTestimonials[0];

      var containerRect = testimonialContainer.getBoundingClientRect();
      var currentRect = currentTestimonial.getBoundingClientRect();

        console.log('currentRect :>> ', currentRect);
        console.log('containerRect :>> ', containerRect);

      var scrollLeft = currentRect.left - containerRect.left - (containerRect.width - currentRect.width) / 2;
      testimonialContainer.scrollTo(
        {
            left: scrollLeft
        }
      ) 
    }
  }


  function switchLastElement(moveRight) {
    var testimonialRow = document.querySelector(".testimonials-row");
    var testimonials = document.getElementsByClassName("testimonial");

    if (moveRight) {
        var firstTest = testimonials[0]
        testimonialRow?.removeChild(firstTest);
        testimonialRow?.append(firstTest);
       } else {
        var lastTest = testimonials[testimonials.length - 1]
        testimonialRow?.removeChild(lastTest);
        testimonialRow?.insertBefore(lastTest, testimonials[0]);
    }

    var scrollDistance = -1 * getTestimonialScrollDistance(moveRight);

    testimonialRow?.scrollBy({
        left: scrollDistance,
        behavior: "instant",
    });
  }

  function addElementBack() {
    var testimonialRow = document.querySelector(".testimonials-row");
    var testimonials = document.getElementsByClassName("testimonial");
        var firstTest = testimonials[0]
        var firstTestClone = firstTest.cloneNode(true);
        testimonialRow?.append(firstTestClone);
        console.log('testimonials :>> ', testimonials);
  }

  function addElementFront() {
    var testimonialRow = document.querySelector(".testimonials-row");
    var testimonials = document.getElementsByClassName("testimonial");
        var firstTest = testimonials[0]
        var firstTestClone = firstTest.cloneNode(true);
        testimonialRow?.insertBefore(firstTestClone, testimonials[0]);
        console.log('testimonials :>> ', testimonials);
  }

  function changeCurrent(moveRight) {
    var moveDirection = moveRight ? 1 : -1;

    var testimonialRow = document.querySelector(".testimonials-row");
    var testimonials = document.getElementsByClassName("testimonial");
    var currentTestimonial = document.querySelector('.testimonial.current');

    var currentIndex = Array.prototype.indexOf.call(testimonials, currentTestimonial);
    
    testimonials[currentIndex].classList.remove("current");
    testimonials[currentIndex + moveDirection].classList.add("current");
  }

  /** 
   * Moves the currenty selected element one to the right or left.
   * 
   * Also shifts the elements around:
   *    A B C D E --- moveRight ----> B C D E A
   * @param {boolean} scrollRight 
   */
  function scrollTestimonial(scrollRight) {
    scrollTestimonials(scrollRight);
    //addElementBack();
    //centerCurrent();
  }

  window.onload = function() {
    centerCurrent();
  }

// window.onload = function() {

//     console.log("test");
//     isTestimonialScrolling = false;

//     testimonialRows = document.getElementsByClassName("testimonials-row");
//     testimonials = document.getElementsByClassName("testimonial")

//     if (testimonialRows.length > 0 && testimonials.length > 0) {
//         testimonialRow = testimonialRows[0];
//         testimonialRowWidth = testimonialRow.getBoundingClientRect()["width"];

//         testimonial = testimonials[0];
//         testimonialWidth = testimonial.getBoundingClientRect()["width"];

//         viewportWidth = window.innerWidth;

//         console.log(`Testimonial Row Width: ${testimonialRowWidth}`);
//         testRowWidth = getTotalWidth(testimonialRow);
//         console.log(`Total Row Width: ${testRowWidth}`);
//         console.log(`Viewport Width: ${viewportWidth}`);

//         testimonialRow.scrollTo({
//             left: (testRowWidth / 2) - (viewportWidth / 2),
//         });
//     }
// }

let isScrolling = false;
let scrollTimeout;
let testimonialRows = document.getElementsByClassName("testimonials-row");
let globalScrollDir = false;


function testimonialScrollingListener() {
    if (testimonialRows.length == 0) {
        return;
    }

    clearTimeout(scrollTimeout);

    var timeOutInMs = 50;

    scrollTimeout = setTimeout(() => {
        changeCurrent(globalScrollDir);
        switchLastElement(globalScrollDir);

        // TODO: recenter elements to prevent gradual misposition due to slightly inaccurate scrolling.

        isScrolling = false;
        testimonialRows[0].removeEventListener("scroll", testimonialScrollingListener);
    }, timeOutInMs);
}

function getTestimonialScrollDistance(scrollRight) {
    // Negative scroll factors scroll to left side
    var scrollFactor = 1;

    if (!scrollRight) {
        // Scroll left
        scrollFactor = -1;
    }

    var testimonials = document.getElementsByClassName("testimonial")

    var testimonial = testimonials[0];
    var testimonialWidth = testimonial.getBoundingClientRect()["width"]

    // Get relative padding (since it is in rem we need fontsize)
    const html = document.documentElement;
    const fontSize = window.getComputedStyle(html).fontSize;
    const fontSizeInPixels = parseFloat(fontSize);
    var gap = 1.5 * fontSizeInPixels;

    const scrollDistance = scrollFactor * (testimonialWidth + gap);

    return scrollDistance;
}

/** 
 * Scrolls one feature container into the given direction.
 * Does nothing if no feature container with the correct class exists.
 * @param {boolean} scrollRight
*/
function scrollTestimonials(scrollRight) {
    if (isScrolling) {
        return;
    }

    isScrolling  = true;
    globalScrollDir = scrollRight;
    var testimonials = document.getElementsByClassName("testimonial")

    if (testimonialRows.length == 0 || testimonials.length == 0) {
        return;
    }

    var testimonialRow = testimonialRows[0];

    var scrollDistance = getTestimonialScrollDistance(scrollRight);

    console.log('scrollDistance :>> ', scrollDistance);

    testimonialRow.addEventListener("scroll", testimonialScrollingListener);
    testimonialRow.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
    });
}