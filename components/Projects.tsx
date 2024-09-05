import AnimatedText from './AnimatedText';
import ProjectCard from './ProjectCard';
import { projects } from '../utils/projectData';

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <AnimatedText>My Projects</AnimatedText>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;