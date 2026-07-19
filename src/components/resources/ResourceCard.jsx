import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar } from 'lucide-react';

const ResourceCard = ({ resource }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Circulars': 'bg-blue-100 text-blue-800',
      'Syllabus': 'bg-green-100 text-green-800',
      'Teaching Guides': 'bg-purple-100 text-purple-800',
      'Annual Reports': 'bg-orange-100 text-orange-800',
      'Others': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={getCategoryColor(resource.category)}>
                {resource.category}
              </Badge>
              {resource.level && (
                <Badge variant="outline">{resource.level}</Badge>
              )}
            </div>
          </div>
          <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(resource.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {resource.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {resource.description}
            </p>
          )}
          <Button asChild className="w-full">
            <a 
              href={resource.file_url} 
              download
              className="flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resource
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;