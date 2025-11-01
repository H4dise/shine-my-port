import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
const About = () => {
  const {
    t
  } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const stats = [{
    value: '5+',
    label: t('about.experience')
  }, {
    value: '50+',
    label: t('about.projects')
  }, {
    value: '30+',
    label: t('about.clients')
  }];
  return <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 50
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h2>

          <p className="text-lg text-muted-foreground text-center mb-12 leading-relaxed font-light">
            {t('about.description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} transition={{
            delay: index * 0.2,
            duration: 0.6
          }}>
                <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
    </section>;
};
export default About;