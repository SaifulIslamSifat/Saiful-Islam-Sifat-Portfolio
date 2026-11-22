// Central, editable profile config. Nothing here is shown unless it has a value.
// Contact details and social links are intentionally EMPTY until the owner approves what is public.

export const profile = {
  fullName: 'Saiful Islam Sefat',
  brand: 'SIFAT',
  title: 'CSE Graduate | Technology Enthusiast | Aspiring Full-Stack Developer',
  greeting: "Hello, I'm Sifat.",
  intro:
    "I'm a Computer Science and Engineering graduate interested in building digital solutions, exploring modern technologies and solving practical problems through creativity and technology.",
  heroLine:
    'Exploring technology, building digital experiences and turning ideas into practical solutions.',
  tagline: 'Beyond Code. Beyond Ordinary.',
  rotatingTaglines: [
    'Exploring Technology.',
    'Building Digital Experiences.',
    'Learning. Creating. Improving.',
    'Turning Ideas into Digital Solutions.',
  ],
  about: [
    'I am a Computer Science and Engineering graduate from International Islamic University Chittagong. I have an academic foundation in programming, software quality assurance, machine learning and web technologies.',
    'Alongside my technical interests, I have professional experience in international client communication and field-based research. I also have training in software testing and graphic design.',
    'I enjoy exploring new technologies, learning practical skills and creating meaningful digital solutions. My goal is to continuously improve my technical abilities and grow professionally in the IT industry.',
  ],
  technicalInterests: ['Web Technologies', 'Machine Learning', 'Software Testing & QA', 'Full-Stack Development'],
  professionalInterests: ['International Client Communication', 'Field Research', 'Graphic Design', 'Technical Support'],
  // Put the CV PDF in client/public and set this path, e.g. '/Sifat-CV.pdf'
  cvUrl: '',
  // Fill in ONLY approved public details.
  contact: { email: '', phone: '', location: 'Cox’s Bazar, Bangladesh' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/SaifulIslamSifat', icon: 'github' },
  ],
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
