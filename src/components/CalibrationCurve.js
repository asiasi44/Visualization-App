import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalibrationCurveViewer({ advertiser }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const imageMap = {
    verticalEcommerce: {
      title: "Calibration Curve - Vertical Ecommerce",
      src: "/analytics/vertical_ecommerce_calibration_curve.png",
    },
    oil: {
      title: "Calibration Curve - Oil Advertiser",
      src: "/analytics/oil_calibration_curve.png",
    },
    tire: {
      title: "Calibration Curve - Tire Advertiser",
      src: "/analytics/tire_calibration_curve.png",
    },
  };

  const { title, src } = imageMap[advertiser] || {};

  if (!src) return <p className="text-red-500">Calibration image not found.</p>;

  return (
    <div className="relative p-4 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-4 text-center text-white">{title}</h3>

      <motion.img
        src={src}
        alt={`${advertiser} calibration curve`}
        className="w-full rounded-2xl shadow-md cursor-zoom-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsZoomed(true)}
      />

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-85 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={src}
              alt="Zoomed Calibration Curve"
              className="max-w-full max-h-full rounded-lg shadow-xl cursor-zoom-out"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
