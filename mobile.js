let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    console.log("Initialized paper element:", this.paper); // Logs the element
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.velX = 0;
    this.velY = 0;
    this.init();
  }
}


  init() {
    this.paper.style.touchAction = "none";

    this.paper.addEventListener("touchstart", (e) => this.onTouchStart(e));
    this.paper.addEventListener("touchmove", (e) => this.onTouchMove(e));
    this.paper.addEventListener("touchend", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;

    this.paper.style.zIndex = highestZ++;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  onTouchMove(e) {
    if (!this.holdingPaper || e.touches.length !== 1) return;
    e.preventDefault();

    let touchMoveX = e.touches[0].clientX;
    let touchMoveY = e.touches[0].clientY;

    this.velX = touchMoveX - this.prevTouchX;
    this.velY = touchMoveY - this.prevTouchY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevTouchX = touchMoveX;
    this.prevTouchY = touchMoveY;
    this.paper.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
  }

  onTouchEnd(); {
    this.holdingPaper = false;
  }


// Initialize all paper elements for touch interaction
const papers = document.querySelectorAll(".paper");
papers.forEach((paper) => new Paper(paper));
