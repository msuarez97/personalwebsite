// Parallax: background layers drift at different speeds while scrolling.
const far = document.querySelector('.bg-far');
const near = document.querySelector('.bg-near');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      far.style.transform = `translate3d(0, ${-y * 0.06}px, 0)`;
      near.style.transform = `translate3d(0, ${-y * 0.18}px, 0)`;
      ticking = false;
    });
  }, { passive: true });
}

// Project tiles and the headshot: tap (touch) or Enter/Space toggles the hover state.
document.querySelectorAll('.thumb, .headshot, .ai-card').forEach((tile) => {
  const toggle = () => {
    const wasOpen = tile.classList.contains('open');
    document.querySelectorAll('.thumb.open, .headshot.open, .ai-card.open').forEach((t) => t.classList.remove('open'));
    if (!wasOpen) tile.classList.add('open');
  };
  tile.addEventListener('click', toggle);
  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

// Fun fact generator: shows a random fact, never the same one twice in a row.
const FACTS = [
  ['Space', 'A day on Venus is longer than its year: it takes about 243 Earth days to spin once, but only 225 to orbit the Sun.'],
  ['Space', 'Sunlight takes about 8 minutes and 20 seconds to reach Earth, so you always see the Sun as it was a few minutes ago.'],
  ['Space', 'Saturn is less dense than water. In a big enough bathtub, it would float.'],
  ['Space', 'About 1.3 million Earths could fit inside the Sun.'],
  ['Space', "Jupiter's Great Red Spot is a storm wider than the entire Earth, and it has been swirling for centuries."],
  ['Space', 'A teaspoon of neutron star material would weigh around a billion tons on Earth.'],
  ['Space', 'Olympus Mons on Mars is the tallest volcano in the solar system, about two and a half times the height of Mount Everest.'],
  ['Space', 'The footprints left on the Moon could last for millions of years, since there is no wind or rain to wear them away.'],
  ['Astronomy', 'When you look at the Andromeda galaxy, you are seeing light that left it about 2.5 million years ago.'],
  ['Astronomy', 'There are more trees on Earth (around 3 trillion) than stars in the Milky Way (roughly 100 to 400 billion).'],
  ['Earth', 'A bolt of lightning can be about five times hotter than the surface of the Sun.'],
  ['Earth', 'Antarctica is the largest desert on Earth. A desert is defined by how little rain or snow falls, not by heat.'],
  ['Earth', "Costa Rica covers a tiny fraction of the planet's land, yet is home to roughly 5% of the world's known species."],
  ['Nature', 'Octopuses have three hearts and blue blood.'],
  ['Nature', 'Botanically speaking, bananas are berries, but strawberries are not.'],
  ['Nature', 'A group of flamingos is called a "flamboyance."'],
  ['Nature', 'Sea otters often hold paws while they sleep so they do not drift apart.'],
  ['Nature', 'Wombats are the only animals known to produce cube-shaped poop.'],
  ['Nature', 'Hummingbirds are among the very few birds that can fly backwards.'],
  ['Nature', 'Archaeologists have found pots of honey in ancient Egyptian tombs that were thousands of years old and still edible.'],
  ['History', 'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid of Giza.'],
  ['History', 'Woolly mammoths were still alive on a remote Arctic island when the Great Pyramid was being built.'],
  ['History', 'Teaching at Oxford University began around 1096, more than two centuries before the city of Tenochtitlan was founded.'],
  ['History', 'The fax machine was patented in 1843, more than 30 years before the telephone.'],
  ['History', 'Some of the oldest known musical instruments are flutes carved from bird bone and mammoth ivory about 40,000 years ago.'],
  ['Art', 'The Mona Lisa was stolen from the Louvre in 1911 and was missing for more than two years before it was found.'],
  ['Art', 'The Eiffel Tower can grow up to about 15 cm taller in summer, as the iron expands in the heat.'],
  ['Literature', "The Tale of Genji, written by Murasaki Shikibu in 11th-century Japan, is often called the world's first novel."],
  ['Literature', 'Shakespeare is credited with the first recorded use of many English words, including "eyeball" and "swagger."'],
  ['Language', 'The word "alphabet" comes from alpha and beta, the first two letters of the Greek alphabet.'],
  ['Language', 'More than 7,000 languages are spoken around the world today.'],
  ['Culture', 'Bluetooth is named after Harald "Bluetooth" Gormsson, a 10th-century Viking king known for uniting tribes, just as the technology unites devices.'],
  ['Culture', 'There are more possible games of chess than there are atoms in the observable universe.'],
  ['Science', 'At its "triple point," water can boil, freeze and exist as vapor all at the same time.'],
  ['Science', "Your body contains about as many bacterial cells as human cells, so you are roughly half microbe."],
];

const factButton = document.getElementById('fact-button');
if (factButton) {
  const topicEl = document.getElementById('fact-topic');
  const textEl = document.getElementById('fact-text');
  let last = -1;
  factButton.addEventListener('click', () => {
    let i;
    do { i = Math.floor(Math.random() * FACTS.length); } while (i === last && FACTS.length > 1);
    last = i;
    const card = factButton.closest('.fact-card');
    card.classList.remove('show');
    void card.offsetWidth; // restart the fade-in animation
    topicEl.textContent = FACTS[i][0];
    textEl.textContent = FACTS[i][1];
    card.classList.add('show');
    factButton.textContent = '✦ Another one!';
  });
}
