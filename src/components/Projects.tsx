import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Eye, Database, Newspaper, Languages } from 'lucide-react';

const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      icon: Eye,
      title: 'Computer Vision',
      description: 'Advanced image processing and computer vision solutions',
    },
    {
      id: 2,
      icon: Database,
      title: 'Data Engineering',
      description: 'Building scalable data pipelines and analytics platforms',
    },
    {
      id: 3,
      icon: Newspaper,
      title: 'Latest News',
      description: 'Real-time news aggregation and content delivery system',
    },
    {
      id: 4,
      icon: Languages,
      title: 'Translation',
      description: 'Multi-language translation and localization services',
    },
  ];

  const handleProjectClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('projects.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => handleProjectClick(project.id)}
                className="cursor-pointer"
              >
                <Card className="p-8 bg-card hover:shadow-xl transition-all group text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-background" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
