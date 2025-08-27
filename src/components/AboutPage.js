import PageContainer from './PageContainer';
import Particles from './Particle';

const AboutPage = () => (
  <PageContainer className="px-8">
    <Particles />
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        About RTB Simulator
      </h1>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            RTB Simulator is an innovative educational platform designed to demystify the complex world 
            of Real-Time Bidding in digital advertising. Our interactive visualization tools help users 
            understand how programmatic advertising works behind the scenes.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Built with cutting-edge web technologies, our platform provides real-time simulations of 
            the entire RTB ecosystem, from user profiling to ad serving, giving you unprecedented 
            insight into the millisecond-fast world of programmatic advertising.
          </p>
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Key Features</h2>
          <ul className="text-lg space-y-2 text-white/80">
            <li>• Interactive RTB process visualization</li>
            <li>• Real-time bidding simulation</li>
            <li>• Advanced analytics and reporting</li>
            <li>• Educational resources and tutorials</li>
          </ul>
        </div>
      </div>
    </div>
  </PageContainer>
);

export default AboutPage;