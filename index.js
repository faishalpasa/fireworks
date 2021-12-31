const getWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

const getHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

const getRandomBetweenNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BROWSER_HEIGHT = getHeight();
const BROWSER_WIDTH = getWidth();
const PARTICLE_TOTAL = 50;

const randomColor = `hsl(${Math.random() * 130 + 0}, 70%, 60%)`;

function fireworkPopAuto() {
  const randomYAxis = getRandomBetweenNumber(BROWSER_HEIGHT / 20, (BROWSER_HEIGHT - (BROWSER_HEIGHT / 2)));
  const randomXAxis = getRandomBetweenNumber(BROWSER_WIDTH / 5, (BROWSER_WIDTH - (BROWSER_WIDTH / 5)));
  const randomColor = `hsl(${Math.random() * 130 + 0}, 70%, 60%)`;
  fireworkLaunch(randomXAxis, randomYAxis, randomColor)
  for (let i = 0; i < PARTICLE_TOTAL; i++) {
    createParticle(randomXAxis, randomYAxis, randomColor);
  }
}

const fireworkPop = (e) => {
  const randomColor = `hsl(${Math.random() * 130 + 0}, 70%, 60%)`;
  fireworkLaunch(e.clientX, e.clientY, randomColor)
  for (let i = 0; i < PARTICLE_TOTAL; i++) {
    createParticle(e.clientX, e.clientY, randomColor);
  }
}

const fireworkLaunch = (xAxis, yAxis, color) => {
  console.log('yAxis', yAxis)
  console.log('xAxis', xAxis)
  const launcher = document.createElement("particle");
  document.body.appendChild(launcher);
  launcher.style.width = '5px';
  launcher.style.height = '5px';
  launcher.style.background = color;
  launcher.style.borderRadius = "50%";
  const animation = launcher.animate(
    [
      {
        transform: `translate(${xAxis}px, ${BROWSER_HEIGHT}px)`,
        opacity: 1,
      },
      {
        transform: `translate(${xAxis}px, ${yAxis}px)`,
        opacity: 1,
      },
    ],
    {
      duration: 1000,
      easing: "ease-out",
      delay: 0,
    }
  );

  animation.onfinish = () => {
    launcher.remove();
  };
}

const createParticle = (xAxis, yAxis, color) => {
  const particle = document.createElement("particle");
  document.body.appendChild(particle);

  const maxSize = 5
  const minSize = 3
  const particleSize = getRandomBetweenNumber(minSize, maxSize);

  particle.style.width = `${particleSize}px`;
  particle.style.height = `${particleSize}px`;

  const destinationX = xAxis + (Math.random() - 0.5) * 2 * 150;
  const destinationY = yAxis + (Math.random() - 0.5) * 2 * 150;

  particle.style.background = color;
  particle.style.borderRadius = "50%";

  const animation = particle.animate(
    [
      {
        transform: `translate(${xAxis - particleSize / 2}px, ${yAxis - particleSize / 2}px)`,
        opacity: 1,
      },
      {
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: "ease-out",
      delay: 1000,
    }
  );

  animation.onfinish = () => {
    particle.remove();
  };
}

if (document) {
  document.addEventListener("click", fireworkPop);
}

setInterval(fireworkPopAuto, 300);
setInterval(fireworkPopAuto, 700);