import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Search, Filter, User, Building, UserCheck } from 'lucide-react';
import { useInternshipStore } from '@/store/internshipStore.ts';

const InternshipFilters = () => {
  const { filters, setFilters } = useInternshipStore();
  const [localFilters, setLocalFilters] = useState({
    studentSearch: '',
    coordinatorSearch: '',
    companyFilter: 'all',
    statusFilter: 'all',
  });

  const handleSearch = () => {
    setFilters(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      studentSearch: '',
      coordinatorSearch: '',
      companyFilter: 'all',
      statusFilter: 'all',
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Филтри за пребарување</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Пребарај по студент/индекс...
          </label>
          <Input
            placeholder="Пребарај по студент/индекс..."
            value={localFilters.studentSearch}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, studentSearch: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Пребарај по координатор...
          </label>
          <Input
            placeholder="Пребарај по координатор..."
            value={localFilters.coordinatorSearch}
            onChange={(e) => setLocalFilters(prev => ({ ...prev, coordinatorSearch: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Building className="h-4 w-4" />
            Сите компании
          </label>
          <Select
            value={localFilters.companyFilter}
            onValueChange={(value) => setLocalFilters(prev => ({ ...prev, companyFilter: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Сите компании" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Сите компании</SelectItem>
              <SelectItem value="netcetera">Netcetera</SelectItem>
              <SelectItem value="seavus">Seavus</SelectItem>
              <SelectItem value="thoughtworks">ThoughtWorks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Сите статуси</label>
          <Select
            value={localFilters.statusFilter}
            onValueChange={(value) => setLocalFilters(prev => ({ ...prev, statusFilter: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Сите статуси" />
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
        <Button onClick={handleSearch} className="bg-action-view text-action-view-foreground hover:bg-action-view/90">
          <Search className="h-4 w-4 mr-2" />
          Пребарај
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Ресетирај
        </Button>
      </div>
    </div>
  );
};

export default InternshipFilters;