import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const projects = {
    '1': {
      title: 'E-Commerce Platform',
      description: 'Modern shopping experience with React & Node.js',
      fullDescription: 'A comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory management, secure payment processing, and an intuitive user interface designed for optimal conversion rates.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'User authentication & profiles',
        'Advanced search & filtering',
        'Order management system',
      ],
    },
    '2': {
      title: 'Portfolio Dashboard',
      description: 'Analytics dashboard for tracking investments',
      fullDescription: 'An advanced analytics dashboard for investment portfolio management. Provides real-time market data, performance tracking, and predictive analytics to help users make informed investment decisions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      tags: ['Vue.js', 'TypeScript', 'Chart.js', 'WebSocket'],
      features: [
        'Real-time market data',
        'Interactive charts & graphs',
        'Portfolio performance tracking',
        'Risk analysis tools',
        'Automated reporting',
      ],
    },
    '3': {
      title: 'Social Media App',
      description: 'Real-time social networking platform',
      fullDescription: 'A modern social networking platform with real-time messaging, content sharing, and interactive features. Built for scalability and performance with a focus on user engagement.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
      tags: ['React Native', 'Firebase', 'Socket.io', 'Redux'],
      features: [
        'Real-time messaging',
        'Media sharing & stories',
        'User connections & feeds',
        'Push notifications',
        'Content moderation',
      ],
    },
  };

  const project = projects[id as keyof typeof projects];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('projects.backToProjects')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-lg shadow-2xl shadow-primary/20"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
