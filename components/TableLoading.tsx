import { TableCell, TableRow } from "@/components/ui/table";

type TableLoadingProps = {
  title: string;
};

const TableLoading = ({ title }: TableLoadingProps) => (
  <TableRow>
    <TableCell colSpan={7} className="text-center py-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500">Loading {title}...</p>
      </div>
    </TableCell>
  </TableRow>
);

export default TableLoading;
