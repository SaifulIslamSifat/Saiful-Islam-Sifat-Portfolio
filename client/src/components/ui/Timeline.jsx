import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../../animations/variants';

// Reusable vertical timeline. Children are rendered inside each entry card.
export default function Timeline({ items }) {
  return (
    <ol className="relative ml-3 border-l border-cyan/30 sm:ml-4">
      {items.map((item) => (
        <motion.li
          key={item.id}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mb-8 pl-6 last:mb-0 sm:pl-10"
        >
          <span
            aria-hidden="true"
            className="absolute -left-[7px] top-6 h-3.5 w-3.5 rounded-full bg-brand-gradient ring-4 ring-bg"
          />
          {item.content}
        </motion.li>
      ))}
    </ol>
  );
}
