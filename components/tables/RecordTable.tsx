import { Table, TableHead, TableHeader, TableRow } from "../ui/table";

const RecordTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default RecordTable();
