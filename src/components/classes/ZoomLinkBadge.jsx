import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Video, Link } from 'lucide-react';

const ZoomLinkBadge = ({ session }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!session?.session_date) return;

    const updateTimer = () => {
      const now = new Date();
      const sessionTime = new Date(session.session_date);
      const diff = sessionTime - now;

      if (diff <= 0) {
        setIsLive(true);
        setTimeRemaining('Live Now!');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const days = Math.floor(hours / 24);
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours % 24}h remaining`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining(`${minutes}m remaining`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);

    return () => clearInterval(interval);
  }, [session]);

  if (!session?.zoom_link) {
    return null;
  }

  return (
    <Card className={`border-2 ${isLive ? 'border-green-500 bg-green-50' : 'border-blue-200'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {isLive ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{timeRemaining}</span>
              </div>
            )}
          </div>
          
          <Button 
            asChild
            className={isLive ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            <a 
              href={session.zoom_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              {isLive ? 'Join Live Session' : 'Join Session'}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZoomLinkBadge;