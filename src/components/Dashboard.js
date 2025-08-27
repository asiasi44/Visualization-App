import PageContainer from './PageContainer';
import Particles from './Particle';

const DashboardPage = () => {
  const metrics = [
    { title: 'Total Impressions', value: '2.4M', change: '+12%', color: 'cyan' },
    { title: 'Click Rate', value: '3.2%', change: '+0.8%', color: 'green' },
    { title: 'Revenue', value: '$45,230', change: '+18%', color: 'purple' },
    { title: 'Fill Rate', value: '94.5%', change: '+2.1%', color: 'orange' }
  ];

  return (
    <PageContainer className="px-8">
      <Particles />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <h3 className="text-white/60 text-sm mb-2">{metric.title}</h3>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold">{metric.value}</span>
                <span className={`text-sm font-semibold ${
                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Real-time Bidding Activity</h2>
            <div className="h-64 bg-gradient-to-t from-cyan-400/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <p className="text-white/60">Interactive charts will be implemented here</p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Performance Trends</h2>
            <div className="h-64 bg-gradient-to-t from-green-400/20 to-blue-500/20 rounded-lg flex items-center justify-center">
              <p className="text-white/60">Time series data visualization</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;