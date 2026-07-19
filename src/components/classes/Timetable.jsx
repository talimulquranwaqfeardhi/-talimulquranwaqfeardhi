import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Timetable = ({ sessions }) => {
  if (!sessions || sessions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No sessions scheduled at this time.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (session) => {
    const now = new Date();
    const sessionDate = new Date(session.session_date);
    const isPast = sessionDate < now;
    
    if (isPast) {
      return <Badge variant="secondary">Completed</Badge>;
    }
    return <Badge variant="default" className="bg-green-500">Upcoming</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-arabic">Class Timetable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">
                    {new Date(session.session_date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell>{session.start_time || 'TBD'}</TableCell>
                  <TableCell>{session.topic || 'General Session'}</TableCell>
                  <TableCell>{session.instructor_name || 'TBD'}</TableCell>
                  <TableCell>{getStatusBadge(session)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timetable;