import {CheckCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const AcceptButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      className="flex items-center gap-0.5 bg-status-accepted text-status-accepted-foreground hover:bg-status-accepted/90"
    >
      <CheckCircle className="h-4 w-4 mr-2" />
      Прифати
    </Button>
  )
}