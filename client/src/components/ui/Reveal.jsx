import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../../animations/variants';

// Scroll-reveal wrapper. Framer Motion honors reduced-motion via MotionConfig in App.
export default function Reveal({ children, className = '', as = 'div', variants = fadeUp }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Tag>
  );
}
