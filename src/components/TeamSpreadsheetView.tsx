
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface TeamMember {
  userId: string;
  name: string;
  joinDate: string;
  level: number;
  side: 'left' | 'right';
  purchased: boolean;
  amount: number;
  status: 'active' | 'inactive';
}

interface TeamSpreadsheetViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  members: TeamMember[];
}

const TeamSpreadsheetView = ({ open, onOpenChange, title, members }: TeamSpreadsheetViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Purchase Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.userId}>
                  <TableCell className="font-medium">{member.userId}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Level {member.level}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        member.side === 'left' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }
                    >
                      {member.side}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.status === 'active' ? 'default' : 'secondary'}
                      className={
                        member.status === 'active' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.purchased ? 'default' : 'destructive'}
                      className={
                        member.purchased 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      }
                    >
                      {member.purchased ? 'Purchased' : 'Not Purchased'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.purchased ? (
                      <span className="font-semibold text-green-600">
                        ₹{member.amount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-500">₹0</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {members.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No team members found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSpreadsheetView;
