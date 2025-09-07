import avatar from '../assets/images/sample-avatar.jpg'; // Your avatar path 

export const author = {
  name: 'Vishu Tiwari',
  slug: 'vishu-tiwari',  // Add this if used in routing
  avatar,
  url: 'https://avtechguides.com',
  bio: 'Freelancer and system administrator passionate about building Tech Tools, Blogging, SEO, and Web Development. Creator of SHRTX.',
  social: {
    github: 'https://github.com/avtechguides',
    twitter: 'https://x.com/avtechguides',   // renamed from x → twitter
    linkedin: 'https://linkedin.com/in/avtechguides',
    youtube: 'https://www.youtube.com/@avtechguides',
  },
  location: 'Mumbai, India',
  email: 'vishu@shrtx.in',
};

export type Author = typeof author;
