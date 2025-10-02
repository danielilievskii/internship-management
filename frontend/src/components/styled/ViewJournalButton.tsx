import {FileText, SendHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const ViewJournalButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      className="flex items-center gap-2 bg-action-view text-action-view-foreground"

    >
      <FileText className="h-4 w-4 mr-2"/>
      Дневник
    </Button>
  )
}