import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Linkedin, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    { icon: Mail, label: t('contact.email'), value: 'h4disem0radi@gmail.com', href: 'mailto:h4disem0radi@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn Profile', href: 'https://linkedin.com/in/' },
    { icon: MapPin, label: t('contact.location'), value: 'Tehran, Iran', href: null },
  ];

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            {t('contact.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Card className="p-6 text-center bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all group cursor-pointer" onClick={() => info.href && window.open(info.href, '_blank')}>
                    <Icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-sm text-muted-foreground mb-2">{info.label}</div>
                    <div className="font-semibold">{info.value}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
