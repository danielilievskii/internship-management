import React from "react";
import { Label } from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.tsx";
import { Textarea } from "../ui/textarea";
import {Button} from "@/components/ui/button.tsx";


interface WeekFormProps {
  entry: {
    fromDate: string;
    toDate: string;
    workingWeeklyHours: number;
    description: string;
  };
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const InternshipWeekForm: React.FC<WeekFormProps> = ({ entry, onChange, onSave, onCancel }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fromDate">Од датум</Label>
          <Input
            id="fromDate"
            type="date"
            value={entry.fromDate}
            onChange={(e) => onChange("fromDate", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="toDate">До датум</Label>
          <Input
            id="toDate"
            type="date"
            value={entry.toDate}
            onChange={(e) => onChange("toDate", e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="workingHours">Работни часови оваа недела</Label>
        <Input
          id="workingHours"
          type="number"
          value={entry.workingHours}
          onChange={(e) => onChange("workingHours", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="description">Опис на активностите</Label>
        <Textarea
          id="description"
          rows={4}
          value={entry.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Опишете ги активностите што ги извршивте оваа недела..."
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={onSave}>Зачувај внес</Button>
        <Button variant="outline" onClick={onCancel}>
          Откажи
        </Button>
      </div>
    </div>
  );
};

export default InternshipWeekForm;
