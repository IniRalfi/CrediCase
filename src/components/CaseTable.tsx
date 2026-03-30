import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { KNOWLEDGE_BASE } from "@/lib/constants";

export function CaseTable() {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Gaji</TableHead>
            <TableHead>Pekerjaan</TableHead>
            <TableHead>Umur</TableHead>
            <TableHead>Tangg</TableHead>
            <TableHead>Kendaraan</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {KNOWLEDGE_BASE.map((kasus) => (
            <TableRow key={kasus.id}>
              <TableCell className="font-medium">{kasus.nama}</TableCell>
              <TableCell>Rp {kasus.gaji.toLocaleString("id-ID")}</TableCell>
              <TableCell>{kasus.pekerjaan}</TableCell>
              <TableCell>{kasus.umur}</TableCell>
              <TableCell>{kasus.tanggungan}</TableCell>
              <TableCell>{kasus.kendaraan}</TableCell>
              <TableCell>
                <Badge variant={kasus.status === "Sangat Layak" ? "default" : "destructive"}>
                  {kasus.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
