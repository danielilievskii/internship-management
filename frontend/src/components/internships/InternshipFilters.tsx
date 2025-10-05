import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx";
import {Filter, User, Building, UserCheck} from "lucide-react";
import {useAuthStore} from "@/store/authStore.ts";
import {InternshipState} from "@/store/internshipStore.ts";

interface InternshipFiltersProps {
  filters: InternshipState['filters'];
  setFilters: (filters: Partial<InternshipState['filters']>) => void;
  setCurrentPage: (page: number) => void;
  onReset: () => void;
}

type FilterKey = "studentSearch" | "coordinatorSearch" | "companyFilter" | "statusFilter";

const InternshipFilters: React.FC<InternshipFiltersProps> = ({
                                                               filters,
                                                               setFilters,
                                                               setCurrentPage,
                                                               onReset
                                                             }) => {
  const {user} = useAuthStore();
  const role = user.role;

  const handleFilterChange = (filter: FilterKey, value: string) => {
    setFilters({ [filter]: value });
    setCurrentPage(1)
  }

  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground"/>
        <h3 className="text-lg font-medium">Филтри за пребарување</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

        {(role === "Company" || role === "Coordinator" || role === "Admin") && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4"/>
              Пребарај по индекс
            </label>
            <Input
              placeholder="Пребарај по индекс..."
              value={filters.studentSearch}
              onChange={(e) => handleFilterChange("studentSearch", e.target.value)}
            />
          </div>
        )}

        {(role === "Student" || role === "Company" || role === "Admin") && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <UserCheck className="h-4 w-4"/>
              Пребарај по координатор
            </label>
            <Input
              placeholder="Пребарај по координатор..."
              value={filters.coordinatorSearch}
              onChange={(e) => handleFilterChange("coordinatorSearch", e.target.value)}
            />
          </div>
        )}

        {(role === "Student" || role === "Coordinator" || role === "Admin") && (
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4"/>
              Сите компании
            </label>
            <Select
              value={filters.companyFilter}
              onValueChange={(value) => handleFilterChange("companyFilter", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Сите компании"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Сите компании</SelectItem>
                <SelectItem value="Netcetera">Netcetera</SelectItem>
                <SelectItem value="Seavus">Seavus</SelectItem>
                <SelectItem value="ThoughtWorks">ThoughtWorks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Сите статуси</label>
          <Select
            value={filters.statusFilter}
            onValueChange={(value) => handleFilterChange("statusFilter", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Сите статуси"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Сите статуси</SelectItem>
              <SelectItem value="SEARCHING">Searching</SelectItem>
              <SelectItem value="SUBMITTED">Submitted</SelectItem>
              <SelectItem value="ACCEPTED">Accepted</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="JOURNAL_SUBMITTED">Journal Submitted</SelectItem>
              <SelectItem value="VALIDATED">Validated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onReset}>
          Ресетирај
        </Button>
      </div>
    </div>
  );
};

export default InternshipFilters;
