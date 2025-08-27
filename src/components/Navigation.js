const Navigation = ({ currentPage, navigate, scrollY }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'simulation', label: 'Simulation' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'about', label: 'About' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full px-12 py-5 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-900/95' : 'bg-slate-900/80'
      } backdrop-blur-xl border-b border-white/10`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('home')}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          RTB Simulator
        </button>
        <ul className="flex gap-10 list-none">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => navigate(item.key)}
                className={`font-medium transition-all duration-300 hover:text-cyan-400 hover:-translate-y-0.5 relative group ${
                  currentPage === item.key ? 'text-cyan-400' : 'text-white/80'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                  currentPage === item.key ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;