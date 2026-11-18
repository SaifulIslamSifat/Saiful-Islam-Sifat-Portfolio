import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

export default function Loader() {
  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-bg"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1 }}
          className="text-gradient font-display text-4xl font-bold"
        >
          {profile.brand}
        </motion.p>
        <div className="mx-auto mt-5 h-[2px] w-40 overflow-hidden rounded bg-line/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-brand-gradient"
          />
        </div>
      </div>
    </motion.div>
  );
}
