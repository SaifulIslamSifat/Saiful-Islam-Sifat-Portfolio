import { motion } from 'framer-motion';
import { profile } from '../../data/profile';

export default function Loader() {
  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#090d0f]"
    >
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 0.8 }}
          className="font-mono text-2xl font-bold tracking-widest text-[#f4f5f2]"
        >
          {profile.brand}
        </motion.p>
        <div className="mx-auto mt-4 h-[2px] w-32 overflow-hidden rounded bg-line">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-1/2 bg-lime"
          />
        </div>
      </div>
    </motion.div>
  );
}
