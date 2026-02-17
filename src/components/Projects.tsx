import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Eye, Database, Newspaper, Bot, ExternalLink, Github, Monitor, Smartphone, Palette, Star } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ProjectCategory = 'web' | 'mobile' | 'design';

interface Project {
  id: number;
  icon: any;
  title: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  technologies: string[];
  featured?: boolean;
  progress?: number;
  liveDemo?: string;
  github?: string;
}

const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      icon: Eye,
      title: 'Computer Vision',
      description: 'Advanced image processing and computer vision solutions',
      fullDescription: 'A comprehensive computer vision platform utilizing deep learning for object detection, facial recognition, and image segmentation. Built with TensorFlow and optimized for real-time processing.',
      category: 'web',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'React'],
      featured: true,
      liveDemo: 'https://demo.example.com',
      github: 'https://github.com/example',
    },
    {
      id: 2,
      icon: Database,
      title: 'Data Engineering',
      description: 'Building scalable data pipelines and analytics platforms',
      fullDescription: 'Enterprise-grade data pipeline processing millions of records daily. Features real-time analytics, automated ETL processes, and comprehensive data visualization dashboards.',
      category: 'web',
      technologies: ['Python', 'Apache Spark', 'PostgreSQL', 'Docker'],
      progress: 75,
      github: 'https://github.com/example',
    },
    {
      id: 3,
      icon: Newspaper,
      title: 'Latest News',
      description: 'Real-time news aggregation and content delivery system',
      fullDescription: 'AI-powered news aggregation platform that curates and delivers personalized content from multiple sources. Features sentiment analysis and topic clustering.',
      category: 'mobile',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'NLP'],
      featured: true,
      liveDemo: 'https://news.example.com',
    },
    {
      id: 4,
      icon: Bot,
      title: 'AI Agent Answer Analysis',
      description: 'Intelligent analysis of AI agent responses and quality evaluation',
      fullDescription: 'A platform for analyzing and evaluating AI agent responses using NLP techniques. Features answer quality scoring, hallucination detection, coherence analysis, and automated benchmarking across multiple AI models.',
      category: 'web',
      technologies: ['Python', 'LangChain', 'FastAPI', 'React'],
      featured: true,
      liveDemo: 'https://ai-analysis.example.com',
      github: 'https://github.com/example',
    },
    {
      id: 5,
      icon: Monitor,
      title: 'Analytics Dashboard',
      description: 'Interactive data visualization and monitoring dashboard',
      fullDescription: 'Real-time analytics dashboard for monitoring data pipelines, model performance, and business KPIs. Features interactive charts, custom alerts, and automated reporting.',
      category: 'web',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      featured: true,
      liveDemo: 'https://dashboard.example.com',
      github: 'https://github.com/example',
    },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'web': return Monitor;
      case 'mobile': return Smartphone;
      case 'design': return Palette;
    }
  };

  const getCategoryColor = (category: ProjectCategory) => {
    switch (category) {
      case 'web': return 'border-blue-500/50 hover:border-blue-500';
      case 'mobile': return 'border-green-500/50 hover:border-green-500';
      case 'design': return 'border-purple-500/50 hover:border-purple-500';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" style={{ animationDuration: '8s' }} />
      <ParticleBackground />
      <div className="container mx-auto px-6 relative z-10">
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

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {(['all', 'web', 'mobile', 'design'] as const).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="gap-2"
            >
              {category !== 'all' && (() => {
                const Icon = getCategoryIcon(category as ProjectCategory);
                return <Icon className="w-4 h-4" />;
              })()}
              {t(`projects.filter${category.charAt(0).toUpperCase() + category.slice(1)}`)}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <Card className={`p-8 bg-card/80 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group text-center border-2 ${getCategoryColor(project.category)} relative overflow-hidden`}>
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {t('projects.featured')}
                      </Badge>
                    </div>
                  )}

                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* Progress Bar for ongoing projects */}
                    {project.progress !== undefined && (
                      <div className="w-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t('projects.status')}</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}

                    {/* Hover Details */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-wrap justify-center">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveDemo && (
                        <a 
                          href={project.liveDemo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {t('projects.liveDemo')}
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                        >
                          <Github className="w-3 h-3" />
                          {t('projects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <selectedProject.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {selectedProject.title}
                  {selectedProject.featured && (
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {t('projects.featured')}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base pt-4">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                {/* Progress */}
                {selectedProject.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{t('projects.status')}</span>
                      <span>{selectedProject.progress}%</span>
                    </div>
                    <Progress value={selectedProject.progress} className="h-2" />
                    {selectedProject.progress < 100 && (
                      <Badge variant="secondary">{t('projects.inProgress')}</Badge>
                    )}
                  </div>
                )}

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Technologies</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {selectedProject.liveDemo && (
                    <Button asChild className="flex-1">
                      <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('projects.liveDemo')}
                      </a>
                    </Button>
                  )}
                  {selectedProject.github && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {t('projects.viewCode')}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
