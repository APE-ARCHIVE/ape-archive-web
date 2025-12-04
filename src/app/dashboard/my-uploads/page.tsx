import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { pdfs } from "@/constants/data"
import { cn } from "@/lib/utils"

const userPdfs = pdfs.slice(0, 5); // Mock data for user's uploads

export default function MyUploadsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">My Uploads</h1>
        <p className="text-muted-foreground">Manage your uploaded documents.</p>
      </header>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPdfs.map((pdf) => (
              <TableRow key={pdf.id}>
                <TableCell className="font-medium">{pdf.title}</TableCell>
                <TableCell>{pdf.subject}</TableCell>
                <TableCell>{pdf.level}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      pdf.status === 'Published' ? 'default' :
                        pdf.status === 'Pending' ? 'secondary' : 'destructive'
                    }
                    className={cn(
                      pdf.status === 'Published' && 'bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30',
                      pdf.status === 'Pending' && 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30',
                      pdf.status === 'Rejected' && 'bg-red-500/20 text-red-700 border-red-500/30 hover:bg-red-500/30',
                      'bg-opacity-50'
                    )}
                  >
                    {pdf.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
