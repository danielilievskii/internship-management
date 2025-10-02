import {Eye, SendHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const DetailsButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      className="flex items-center gap-0.5 bg-action-view text-action-view-foreground hover:bg-action-view/90"
    >
      <Eye className="h-4 w-4 mr-2"/>
      Детали
    </Button>
  )
}