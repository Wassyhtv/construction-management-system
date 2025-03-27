document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
    });

    button.addEventListener("mousedown", () => {
      button.style.transform = "scale(0.95)";
    });

    button.addEventListener("mouseup", () => {
      button.style.transform = "scale(1)";
    });
  });
});
