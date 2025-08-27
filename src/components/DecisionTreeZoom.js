import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DecisionTreeZoomImage({ advertiser }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const imageMap = {
    "verticalEcommerce": {
      title: "Vertical Ecommerce Decision Tree",
      src: "/analytics/verticalEcommerce.png"
    },
    "oil": {
      title: "Oil Advertiser Decision Tree",
      src: "/analytics/oilTree.png"
    },
    "tire": {
      title: "Tire Advertiser Decision Tree",
      src: "/analytics/tireTree.png"
    }
  };

  const { title, src } = imageMap[advertiser] || {};

  if (!src) return <p className="text-red-600">Advertiser not found</p>;

  return (
    <div className="relative p-4 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>

      <motion.img
        src={src}
        alt={`${advertiser} decision tree`}
        className="w-full rounded-2xl shadow-lg cursor-zoom-in"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={() => setIsZoomed(true)}
      />

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={src}
              alt="Zoomed Decision Tree"
              className="max-w-full max-h-full rounded-xl shadow-xl cursor-zoom-out"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
