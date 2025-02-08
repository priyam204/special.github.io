let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.rotating = false;
    this.init();
  }

  init() {
    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;

    this.paper.addEventListener("touchstart", (e) => this.onTouchStart(e));
    this.paper.addEventListener("touchmove", (e) => this.onTouchMove(e));
    this.paper.addEventListener("touchend", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    if (e.touches.length === 1) {
      this.holdingPaper = true;
      this.paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX - this.currentPaperX;
      this.touchStartY = e.touches[0].clientY - this.currentPaperY;
      this.prevTouchX = e.touches[0].clientX;
      this.prevTouchY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      this.rotating = true;
    }
  }

  onTouchMove(e) {
    e.preventDefault();
    if (this.holdingPaper && e.touches.length === 1) {
      let touchX = e.touches[0].clientX;
      let touchY = e.touches[0].clientY;
      this.currentPaperX = touchX - this.touchStartX;
      this.currentPaperY = touchY - this.touchStartY;
      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    } else if (this.rotating && e.touches.length === 2) {
      let dx = e.touches[1].clientX - e.touches[0].clientX;
      let dy = e.touches[1].clientY - e.touches[0].clientY;
      this.rotation = Math.atan2(dy, dx) * (180 / Math.PI);
      this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    }
  }

  onTouchEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

// Apply functionality to all elements with class 'paper'
document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));
