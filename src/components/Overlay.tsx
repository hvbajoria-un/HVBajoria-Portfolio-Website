import { motion } from 'motion/react';
import { Github, Twitter, Mail, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Neon Odyssey',
    category: 'WebGL Experience',
    year: '2025',
    link: '#',
  },
  {
    title: 'Aura UI',
    category: 'Design System',
    year: '2024',
    link: '#',
  },
  {
    title: 'Void.fm',
    category: 'Generative Audio',
    year: '2024',
    link: '#',
  }
];

export function Overlay() {
  return (
    <div className="relative w-full z-10 flex flex-col text-white selection:bg-white/30 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center mix-blend-difference z-50">
        <div className="font-display font-bold text-xl tracking-tighter uppercase">Portfolio.</div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#projects" className="hover:text-white/60 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="font-display text-[4.5rem] md:text-[9rem] font-bold tracking-tighter leading-[0.9] mb-8 max-w-5xl text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
            Digital<br/>
            Craftsman.
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-md font-sans text-lg md:text-xl text-white/70 font-light"
        >
          <p>
            I build immersive digital experiences focusing on motion, 3D, and high-performance interfaces.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 120 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
          className="absolute bottom-0 left-6 md:left-24 w-[1px] bg-gradient-to-b from-white/30 to-transparent origin-top"
        />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl ml-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-10 tracking-tight">The Philosophy</h2>
          <p className="text-xl md:text-3xl leading-snug md:leading-snug text-white/80 font-sans font-light">
            Good design isn't just how it looks—it's how it feels. By bridging the gap between engineering and art, I aim to create websites that are remembered, not just visited. 
            <br/><br/>
            Currently pushing pixels and writing shaders from a cozy desk somewhere on Earth.
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen w-full py-32 px-6 md:px-24">
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl font-bold mb-20 tracking-tight"
        >
          Selected Works
        </motion.h2>
        
        <div className="flex flex-col w-full border-t border-white/10">
          {projects.map((project, i) => (
            <motion.a
              href={project.link}
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-12 md:py-16 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-2xl cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-white/50 text-sm font-mono mb-4 uppercase tracking-wider">{project.category}</span>
                <h3 className="font-display text-4xl md:text-7xl font-semibold tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  {project.title}
                </h3>
              </div>
              <div className="flex items-center gap-8 mt-6 md:mt-0 opacity-100 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-mono text-sm tracking-widest">{project.year}</span>
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500 ease-out">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[80vh] w-full flex flex-col items-center justify-center py-32 px-6 md:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">Let's Talk.</h2>
          <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-lg mx-auto font-light">
            Available for freelance opportunities and interesting collaborations worldwide.
          </p>
          
          <a href="mailto:hello@example.com" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform duration-300">
            Start a Project
          </a>
          
          <div className="flex justify-center gap-6 mt-32">
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-white/40 border-t border-white/10 uppercase tracking-widest">
        <span>© {new Date().getFullYear()}</span>
        <span>Crafted with intent.</span>
      </footer>
    </div>
  );
}
