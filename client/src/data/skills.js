// Levels are descriptive labels only (no percentages). A skill is a string or { name, level }.
export const skillCategories = [
  { id: 'programming', title: 'Programming', icon: 'Code2', items: ['C', 'C++', { name: 'Python', level: 'Basic' }] },
  {
    id: 'web',
    title: 'Web Technologies',
    icon: 'Globe',
    items: ['HTML', 'CSS', { name: 'JavaScript', level: 'Beginner' }, 'WordPress'],
  },
  { id: 'database', title: 'Database Management', icon: 'Database', items: [{ name: 'MySQL', level: 'Basic' }] },
  {
    id: 'ml',
    title: 'Machine Learning & AI',
    icon: 'BrainCircuit',
    items: ['Data Preprocessing', 'Image Processing', 'Prediction', 'Model Training'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    items: ['Visual Studio Code', 'Google Colab', 'Cisco', 'PSpice', 'VirtualBox', 'AutoCAD'],
  },
  { id: 'design', title: 'Graphic Design', icon: 'Palette', items: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva'] },
  { id: 'video', title: 'Video Editing', icon: 'Clapperboard', items: ['CapCut'] },
  {
    id: 'office',
    title: 'Office Management',
    icon: 'FileSpreadsheet',
    items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    icon: 'Terminal',
    items: ['Windows', { name: 'Linux', level: 'Basic' }, 'Kali Linux'],
  },
  {
    id: 'typing',
    title: 'Typing',
    icon: 'Keyboard',
    items: [
      { name: 'English', level: '35+ WPM' },
      { name: 'Bangla', level: '10+ WPM' },
    ],
  },
];

export const languages = [
  {
    language: 'English',
    skills: [
      { label: 'Reading', value: 'Excellent' },
      { label: 'Writing', value: 'Good' },
      { label: 'Listening', value: 'Good' },
      { label: 'Speaking', value: 'Intermediate' },
    ],
  },
];
