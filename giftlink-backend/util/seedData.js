/* jshint esversion: 11, node: true */
const owners = [
  'Maya',
  'Noah',
  'Ari',
  'Lena',
  'Jonah',
  'Sage',
  'Tessa',
  'Rowan',
  'Piper',
  'Elio',
  'Hazel',
  'Micah',
  'Nina',
  'Theo',
  'Jules'
];

const locations = [
  'Maple Grove',
  'Fern Hill',
  'Clover Bay',
  'Oak Terrace',
  'Willow Bend',
  'Sunset Park',
  'River Market',
  'North Harbor',
  'Garden District',
  'Brookside',
  'Juniper Heights',
  'Stonebridge'
];

const descriptors = [
  'Sunbeam',
  'Mint',
  'Cloud',
  'Honey',
  'Cedar',
  'Meadow',
  'Skyline',
  'Amber',
  'Pebble',
  'Moonlit',
  'Harbor',
  'Bramble',
  'Daisy',
  'Spruce',
  'Velvet'
];

const conditions = [
  'gently used',
  'clean and sturdy',
  'well kept',
  'freshly wiped down',
  'ready for pickup',
  'in great shape'
];

const pickupNotes = [
  'Porch pickup is easiest in the evening.',
  'Weekend pickup works best.',
  'Can hold until tomorrow afternoon.',
  'Near the main bus stop for easy pickup.',
  'Message first and I can bring it outside.',
  'Flexible on pickup time this week.'
];

const templates = [
  {
    label: 'Lamp',
    category: 'Lighting',
    detail: 'table lamp with a soft shade',
    image: '/images/lamp.svg'
  },
  {
    label: 'Tea Set',
    category: 'Kitchen',
    detail: 'tea set for cozy afternoons',
    image: '/images/tea.svg'
  },
  {
    label: 'Pillow Pair',
    category: 'Bedroom',
    detail: 'pair of pillows with soft covers',
    image: '/images/pillow.svg'
  },
  {
    label: 'Storage Crate',
    category: 'Storage',
    detail: 'stackable storage crate for closets or entryways',
    image: '/images/sparkle-box.svg'
  },
  {
    label: 'Floor Lamp',
    category: 'Lighting',
    detail: 'tall floor lamp that gives a warm reading glow',
    image: '/images/lamp.svg'
  },
  {
    label: 'Mixing Bowl Set',
    category: 'Kitchen',
    detail: 'nested mixing bowls for baking and meal prep',
    image: '/images/tea.svg'
  },
  {
    label: 'Throw Blanket',
    category: 'Bedroom',
    detail: 'lightweight throw blanket for sofa or guest room',
    image: '/images/pillow.svg'
  },
  {
    label: 'Toy Bin',
    category: 'Kids',
    detail: 'roomy toy bin that keeps play areas tidy',
    image: '/images/sparkle-box.svg'
  },
  {
    label: 'Desk Organizer',
    category: 'Office',
    detail: 'compact organizer for mail, notebooks, or pens',
    image: '/images/sparkle-box.svg'
  },
  {
    label: 'Entry Rug',
    category: 'Decor',
    detail: 'small entry rug with a simple woven pattern',
    image: '/images/pillow.svg'
  },
  {
    label: 'Planter Pot',
    category: 'Garden',
    detail: 'ceramic planter pot for herbs or houseplants',
    image: '/images/sparkle-box.svg'
  },
  {
    label: 'Shoe Rack',
    category: 'Storage',
    detail: 'narrow shoe rack that fits by the door',
    image: '/images/sparkle-box.svg'
  }
];

const sampleGifts = Array.from({ length: 180 }, function (_, index) {
  const owner = owners[index % owners.length];
  const location = locations[index % locations.length];
  const descriptor = descriptors[index % descriptors.length];
  const template = templates[index % templates.length];
  const condition = conditions[index % conditions.length];
  const pickupNote = pickupNotes[index % pickupNotes.length];
  const edition = Math.floor(index / templates.length) + 1;
  const emailName = owner.toLowerCase();

  return {
    id: `gift-${index + 1}`,
    name: `${descriptor} ${template.label} ${edition}`,
    category: template.category,
    description: `A ${condition} ${template.detail}. Great for homes in ${location.toLowerCase()} and easy to reuse right away. ${pickupNote}`,
    owner: owner,
    ownerEmail: `${emailName}${edition}@example.com`,
    location: location,
    image: template.image
  };
});

module.exports = { sampleGifts };
