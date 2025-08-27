import PageContainer from './PageContainer';
import Particles from './Particle';

const HomePage = ({ navigate }) => {
  return (
    <PageContainer>
      <Particles />
      <section className="min-h-screen flex items-center justify-center text-center relative px-5">
        <div className="max-w-4xl z-10">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            RTB Visualization
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/80">
            Experience the future of ad tech with our interactive Real-Time Bidding simulator. 
            Watch as personalized ads come to life through cutting-edge programmatic technology.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-transform" onClick={() => navigate("simulation")}>
              Start Visualizing
            </button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default HomePage