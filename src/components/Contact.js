import PageContainer from './PageContainer';
import Particles from './Particle';

const ContactPage = () => (
  <PageContainer className="px-8">
    <Particles />
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Get In Touch
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:border-cyan-400 focus:outline-none transition-all resize-none"
            />
            <button className="w-full p-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform">
              Send Message
            </button>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center">
                📧
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-white/60">contact@rtbsimulator.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                🌐
              </div>
              <div>
                <p className="font-semibold">Website</p>
                <p className="text-white/60">www.rtbsimulator.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-400/20 rounded-lg flex items-center justify-center">
                💬
              </div>
              <div>
                <p className="font-semibold">Support</p>
                <p className="text-white/60">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
);

export default ContactPage;