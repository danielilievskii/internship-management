import {XCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const RejectButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      className="flex items-center gap-0.5 bg-status-rejected text-status-rejected-foreground hover:bg-status-rejected/90"
    >
      <XCircle className="h-4 w-4 mr-2" />
      Одбиј
    </Button>
  )
}