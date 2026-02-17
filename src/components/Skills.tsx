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
    { name: 'Python', level: 95, icon: '🐍', color: 'from-yellow-400 to-blue-500' },
    { name: 'NumPy', level: 90, icon: '🔢', color: 'from-blue-400 to-cyan-400' },
    { name: 'SQL', level: 88, icon: '🗄️', color: 'from-orange-400 to-red-400' },
    { name: 'Machine Learning', level: 85, icon: '🧠', color: 'from-purple-400 to-pink-400' },
    { name: 'TensorFlow', level: 80, icon: '⚡', color: 'from-orange-500 to-yellow-400' },
  ];

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      {/* Code-style background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <pre className="text-xs leading-relaxed font-mono text-foreground whitespace-pre-wrap p-8">
          {`import numpy as np\nimport tensorflow as tf\nfrom sklearn.model_selection import train_test_split\n\ndef build_pipeline(data):\n    X_train, X_test = train_test_split(data)\n    model = tf.keras.Sequential([\n        tf.keras.layers.Dense(128, activation='relu'),\n        tf.keras.layers.Dense(1, activation='sigmoid')\n    ])\n    return model.fit(X_train)\n\nSELECT * FROM models WHERE accuracy > 0.95;`}
        </pre>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-14">
            {t('skills.subtitle')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 30 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.08, y: -6 }}
              >
                <Card className="relative p-5 bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden text-center">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Circular progress ring */}
                  <div className="relative mx-auto w-20 h-20 mb-3">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle
                        cx="40" cy="40" r="34"
                        fill="none"
                        stroke="hsl(var(--secondary))"
                        strokeWidth="5"
                      />
                      <motion.circle
                        cx="40" cy="40" r="34"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                        animate={isInView ? { strokeDashoffset: 2 * Math.PI * 34 * (1 - skill.level / 100) } : { strokeDashoffset: 2 * Math.PI * 34 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 1.2, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">{skill.icon}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{skill.name}</h3>
                  <motion.span
                    className="text-xs font-mono text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.8 }}
                  >
                    {skill.level}%
                  </motion.span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
