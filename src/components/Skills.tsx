import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card } from '@/components/ui/card';

const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    { name: 'Python', level: 95, icon: '🐍', glow: '170, 80%, 50%' },
    { name: 'NumPy', level: 90, icon: '🔢', glow: '200, 80%, 55%' },
    { name: 'SQL', level: 88, icon: '🗄️', glow: '30, 90%, 55%' },
    { name: 'Machine Learning', level: 85, icon: '🧠', glow: '280, 70%, 60%' },
    { name: 'TensorFlow', level: 80, icon: '⚡', glow: '45, 95%, 55%' },
  ];

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Code watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <pre className="text-xs leading-relaxed font-mono text-foreground whitespace-pre-wrap p-8">
          {`import numpy as np\nimport tensorflow as tf\nfrom sklearn.model_selection import train_test_split\n\ndef build_pipeline(data):\n    X_train, X_test = train_test_split(data)\n    model = tf.keras.Sequential([\n        tf.keras.layers.Dense(128, activation='relu'),\n        tf.keras.layers.Dense(1, activation='sigmoid')\n    ])\n    return model.fit(X_train)`}
        </pre>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16">
            {t('skills.subtitle')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {skills.map((skill, index) => {
              const circumference = 2 * Math.PI * 38;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.3, y: 40 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.3, y: 40 }}
                  transition={{ delay: index * 0.12, duration: 0.6, type: 'spring', stiffness: 180 }}
                  whileHover={{ scale: 1.12, y: -10 }}
                >
                  <Card
                    className="relative p-6 bg-card/70 backdrop-blur-md border-border hover:border-primary/60 transition-all duration-500 group overflow-hidden text-center"
                    style={{
                      boxShadow: `0 0 0px hsla(${skill.glow}, 0)`,
                      transition: 'box-shadow 0.5s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px hsla(${skill.glow}, 0.3), 0 0 60px hsla(${skill.glow}, 0.1)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px hsla(${skill.glow}, 0)`;
                    }}
                  >
                    {/* Background glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-lg"
                      style={{ background: `radial-gradient(circle at center, hsla(${skill.glow}, 0.4), transparent 70%)` }}
                    />

                    {/* Circular progress */}
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <svg className="w-24 h-24 -rotate-90 drop-shadow-lg" viewBox="0 0 84 84">
                        <circle
                          cx="42" cy="42" r="38"
                          fill="none"
                          stroke="hsl(var(--secondary))"
                          strokeWidth="4"
                        />
                        <motion.circle
                          cx="42" cy="42" r="38"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={isInView ? { strokeDashoffset: circumference * (1 - skill.level / 100) } : { strokeDashoffset: circumference }}
                          transition={{ delay: index * 0.12 + 0.4, duration: 1.4, ease: 'easeOut' }}
                          className="drop-shadow-[0_0_6px_hsl(var(--primary))]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl drop-shadow-lg">{skill.icon}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors tracking-wide uppercase">
                      {skill.name}
                    </h3>
                    <motion.span
                      className="text-lg font-extrabold font-mono text-primary"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.12 + 1 }}
                    >
                      {skill.level}%
                    </motion.span>
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

export default Skills;
