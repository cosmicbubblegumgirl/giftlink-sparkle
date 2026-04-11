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
  'Micah'
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
  'Daisy'
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
    label: 'Desk Organizer',
    category: 'Office',
    detail: 'compact organizer for mail, notebooks, or pens',
    image: '/images/sparkle-box.svg'
  },
  {
    label: 'Planter Pot',
    category: 'Garden',
    detail: 'ceramic planter pot for herbs or houseplants',
    image: '/images/sparkle-box.svg'
  }
];

export const sampleGifts = Array.from({ length: 36 }, function (_, index) {
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
    owner,
    ownerEmail: `${emailName}${edition}@example.com`,
    location,
    image: template.image
  };
});