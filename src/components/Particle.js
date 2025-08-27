const Particles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full opacity-40 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    />
  ));
  return <div className="fixed inset-0 overflow-hidden pointer-events-none">{particles}</div>;
};

export default Particles