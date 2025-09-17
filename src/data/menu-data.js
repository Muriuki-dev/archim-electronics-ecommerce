

const menu_data = [
  {
    id: 1,
    products: true,
    title: 'Electronics',
    link: '/accessories',
    product_pages: [
      {
        title: 'Wireless Devices',
        link: '/accessories',
        mega_menus: [
          { title: 'Routers', link: '/accessories' },
          { title: 'Wireless Outdoor CPE', link: '/accessories' },
          { title: 'Wireless Access Points', link: '/accessories' },
          { title: 'USB Wifi Adapters', link: '/accessories' },
          { title: 'Point to point Antennas', link: '/accessories' },
          { title: 'Network Switches', link: '/accessories' },
          { title: 'Range Extenders', link: '/accessories' },
        ],
      },
      {
        title: 'Structured Cabling',
        link: '/accessories',
        mega_menus: [
          { title: 'Ethernet Cables', link: '/accessories' },
          { title: 'Network Cabinets', link: '/accessories' },
          { title: 'Media Converters', link: '/accessories' },
          { title: 'POE Injectors', link: '/accessories' },
          { title: 'Point to point Antennas', link: '/accessories' },
          { title: 'Cabinet Shelves', link: '/accessories' },
        ],
      },
      {
        title: 'Fibre Optic Solution',
        link: '/accessories',
        mega_menus: [
          { title: 'Fiber Optic Cables', link: '/accessories' },
          { title: 'Fiber Optic Enclosurers', link: '/accessories' },
          { title: 'Fast Connectors', link: '/accessories' },
          { title: 'Fiber Patch cords & Pigtails', link: '/accessories' },
          { title: 'Fibre Optic Bare PLC Splitters', link: '/accessories' },
          { title: 'Optical Distribution Frames', link: '/accessories' },
        ],
      },
      {
        title: 'PBX + Phones',
        link: '/accessories',
        mega_menus: [
          { title: 'Yeastar PBX System', link: '/accessories' },
          { title: 'Yealink IP Phones', link: '/accessories' },
          { title: 'Fanvil IP Phones', link: '/accessories' },
          { title: 'Panasonic PBX', link: '/accessories' },
          { title: 'Panasonic Phones', link: '/accessories' },
          { title: 'Grandstream', link: '/accessories' },
        ],
      },
      {
        title: 'Security Cameras',
        link: '/accessories',
        mega_menus: [
          { title: 'CCTV Security Cameras', link: '/accessories' },
          { title: 'Access Control', link: '/accessories' },
        ],
      },
    ],
  },
  {
    id: 3,
    single_link: true,
    title: 'Contact Us',
    link: '/contact',
  },
];

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    sub_menu: true,
    title: 'Wireless Devices',
    link: '/accessories',
    sub_menus: [
      { title: 'Routers', link: '/accessories' },
      { title: 'Wireless Outdoor CPE', link: '/accessories' },
      { title: 'Wireless Access Points', link: '/accessories' },
      { title: 'USB Wifi Adapters', link: '/accessories' },
      { title: 'Point to point Antennas', link: '/accessories' },
      { title: 'Network Switches', link: '/accessories' },
      { title: 'Range Extenders', link: '/accessories' },
    ],
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Structured Cabling',
    link: '/accessories',
    sub_menus: [
      { title: 'Ethernet Cables', link: '/accessories' },
      { title: 'Network Cabinets', link: '/accessories' },
      { title: 'Media Converters', link: '/accessories' },
      { title: 'POE Injectors', link: '/accessories' },
      { title: 'Point to point Antennas', link: '/accessories' },
      { title: 'Cabinet Shelves', link: '/accessories' },
    ],
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Fibre Optic Solution',
    link: '/accessories',
    sub_menus: [
      { title: 'Fiber Optic Cables', link: '/accessories' },
      { title: 'Fiber Optic Enclosurers', link: '/accessories' },
      { title: 'Fast Connectors', link: '/accessories' },
      { title: 'Fiber Patch cords & Pigtails', link: '/accessories' },
      { title: 'Fibre Optic Bare PLC Splitters', link: '/accessories' },
      { title: 'Optical Distribution Frames', link: '/accessories' },
    ],
  },
  {
    id: 4,
    sub_menu: true,
    title: 'PBX + Phones',
    link: '/accessories',
    sub_menus: [
      { title: 'Yeastar PBX System', link: '/accessories' },
      { title: 'Yealink IP Phones', link: '/accessories' },
      { title: 'Fanvil IP Phones', link: '/accessories' },
      { title: 'Panasonic PBX', link: '/accessories' },
      { title: 'Panasonic Phones', link: '/accessories' },
      { title: 'Grandstream', link: '/accessories' },
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Security Cameras',
    link: '/accessories',
    sub_menus: [
      { title: 'CCTV Security Cameras', link: '/accessories' },
      { title: 'Access Control', link: '/accessories' },
    ],
  },
  {
    id: 9,
    single_link: true,
    title: 'Contact Us',
    link: '/contact',
  },
];
