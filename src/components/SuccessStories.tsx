import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, TrendingUp } from 'lucide-react';

export const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      title: 'Expertise Across Healthcare',
      content: 'GCMS has over seven years of experience in the U.S. healthcare system. Our primary objective is to assist patients in filing their claims accurately and on time while helping healthcare companies grow their revenue, eliminate billing challenges, and streamline Revenue Cycle Management processes.',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Multi-Specialty Experience',
      content: 'We\'ve collaborated with a diverse range of specialties including General Practice, Family Medicine, Behavioral Health, Psychiatry, Physical Therapy, Plastic Surgery, Gastroenterology, Pain Management, Primary Care, Podiatry, ENT, Dermatology, Workers\' Compensation, and Auto Accident cases.',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      title: 'Urgent Care Transformation',
      content: 'Working with various urgent care facilities across the U.S., we successfully helped providers optimize their billing and collections processes, resulting in improved cash flow and operational efficiency.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: 'I wanted to take a moment to personally recognize the growth GCMS helped us achieve since we joined them. We have noticed their increased dedication, attention to detail, and commitment to the billing department. We truly appreciate your contribution and the steady progress you\'ve made.',
      author: 'Urgent Care Provider',
      location: 'Texas',
      rating: 5
    },
    {
      id: 2,
      quote: 'We joined Global Care Medical Solutions in 2024 and they have since proven to be an invaluable addition to our billing staff. Their expertise in revenue cycle management has significantly improved our collections.',
      author: 'Pain Management Group',
      location: 'New Jersey and Pennsylvania',
      rating: 5
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Success Stories & Expertise
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Transforming healthcare revenue cycles with proven results and specialized expertise
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`inline-flex p-3 rounded-lg ${story.color} mb-4`}>
                {story.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                {story.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {story.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8">
            What Our Clients Say
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* Quote marks */}
                <div className="absolute top-6 left-6 text-6xl text-blue-200 dark:text-blue-900 opacity-50">
                  "
                </div>
                
                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                
                {/* Author info */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-1 shadow-lg">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Ready to Transform Your Practice?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Join the growing list of healthcare providers who have optimized their revenue cycle with GCMS expertise.
              </p>
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Success Story
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

