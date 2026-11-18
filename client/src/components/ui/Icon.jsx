import * as Lucide from 'lucide-react';

// Resolve an icon by its lucide name so data files stay plain strings.
export default function Icon({ name, ...props }) {
  const Cmp = Lucide[name] || Lucide.Sparkles;
  return <Cmp aria-hidden="true" {...props} />;
}
