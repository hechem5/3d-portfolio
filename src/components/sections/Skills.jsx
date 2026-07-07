import InfiniteMenu from '../reactbits/InfiniteMenu';

const skillItems = [
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', title: 'React.js', description: 'Frontend Library', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', title: 'JavaScript', description: 'Core Language', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', title: 'Node.js', description: 'JavaScript Runtime', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', title: 'Tailwind CSS', description: 'Utility-first CSS', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', title: 'HTML5', description: 'Markup Language', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', title: 'CSS3', description: 'Styling Language', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', title: 'MongoDB', description: 'NoSQL Database', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', title: 'PostgreSQL', description: 'Relational Database', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', title: 'TypeScript', description: 'Typed JavaScript', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', title: 'Docker', description: 'Containerization', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', title: 'AWS', description: 'Cloud Platform', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', title: 'Python', description: 'Backend & AI', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', title: 'Java', description: 'Enterprise Backend', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', title: 'Spring Boot', description: 'Java Framework', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', title: 'PHP', description: 'Backend Scripting', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', title: 'MySQL', description: 'Relational Database', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', title: 'Vue.js', description: 'Frontend Framework', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', title: 'Angular', description: 'Frontend Framework', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', title: 'Django', description: 'Python Framework', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg', title: 'Firebase', description: 'BaaS Platform', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', title: 'Linux', description: 'Operating System', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', title: 'Git', description: 'Version Control', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', title: 'GitHub', description: 'Code Hosting', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', title: 'Figma', description: 'UI/UX Design', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', title: 'C++', description: 'Systems Programming', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', title: 'C#', description: 'Backend & Games', link: '#' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg', title: 'Google Cloud', description: 'Cloud Platform', link: '#' },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-header" style={{ marginBottom: '1rem' }}>
        <span className="section-subtitle">What I Know</span>
        <h2 className="heading-lg">Skills & Technologies</h2>
      </div>

      <div className="hero-scroll-indicator" style={{ position: 'relative', margin: '0 auto 2rem auto', bottom: 'auto', left: 'auto', transform: 'none', pointerEvents: 'none' }}>
        <span style={{ fontSize: '0.65rem' }}>Click & Drag</span>
        <div className="scroll-dot-container">
          <div className="scroll-dot" />
        </div>
      </div>

      <div style={{ 
        width: '100vw', 
        position: 'relative', 
        left: '50%', 
        right: '50%', 
        marginLeft: '-50vw', 
        marginRight: '-50vw', 
        height: '600px'
      }}>
        <InfiniteMenu items={skillItems} />
      </div>
    </section>
  );
}
