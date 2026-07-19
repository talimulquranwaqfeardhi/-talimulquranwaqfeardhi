import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, FileText, Play, Video } from 'lucide-react';

const MaterialTabs = ({ materials = [] }) => {
  const [activeTab, setActiveTab] = useState('pdf');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || material.level === levelFilter;
    const matchesType = activeTab === 'pdf' ? material.type === 'pdf' : material.type === 'media';
    return matchesSearch && matchesLevel && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pdf" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            PDF Materials
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Audio/Visual Materials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pdf" className="mt-6">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No PDF materials available
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <h4 className="font-medium truncate">{material.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{material.level}</p>
                    <Button 
                      asChild
                      variant="outline" 
                      className="w-full mt-3"
                    >
                      <a href={material.file_url} download className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No media materials available
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMaterials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-3">
                      {material.embed_url ? (
                        <iframe
                          src={material.embed_url}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={material.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-white">
                            <Video className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-sm">Preview unavailable</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium">{material.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{material.level}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialTabs;