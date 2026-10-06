import React from 'react';
import { Sparkles, Heart, Gem, CalendarHeart, BookmarkCheck } from 'lucide-react';
import { useClient } from '../context/ClientContext';
import { formatTanggal } from '../utils/dateFormatter';

const iconMap = {
  sparkles: Sparkles,
  heart: Heart,
  gem: Gem,
  wedding: CalendarHeart,
};

const Story = () => {
  const client = useClient();
  const stories = client.loveStory || [];

  if (stories.length === 0) {
    return null;
  }

  return (
    <section id="story" className="section story-section">
      <div className="section-container content-z">
        <div className="text-center reveal-on-scroll">
          <h2 className="section-title">
            Perjalanan Cinta
          </h2>
          <p className="section-subtitle font-serif text-white mb-10">
            Kisah perjalanan kasih kami hingga mengikat janji suci
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true"></div>
          
          <div className="timeline-items">
            {stories.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || BookmarkCheck;
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  className={`timeline-item ${isEven ? 'timeline-left' : 'timeline-right'} reveal-on-scroll delay-${(idx % 4 + 1) * 100}`}
                >
                  {/* Center Node with Icon */}
                  <div className="timeline-node" aria-hidden="true">
                    <div className="timeline-node-circle">
                      <IconComponent size={16} className="text-gold" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <span className="timeline-year font-display text-gold">{item.year}</span>
                      <span className="timeline-date font-sans">{formatTanggal(item.date, { withDay: false })}</span>
                    </div>

                    <h3 className="timeline-title font-display">{item.title}</h3>
                    
                    <p className="timeline-desc font-serif">{item.description}</p>

                    {item.photo && (
                      <div className="timeline-photo-wrapper">
                        <img 
                          src={item.photo} 
                          alt={item.title} 
                          loading="lazy" 
                          className="timeline-photo" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
