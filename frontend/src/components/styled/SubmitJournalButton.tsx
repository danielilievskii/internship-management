import { SendHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const SubmitJournalButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      className="flex items-center gap-2 bg-action-view text-action-view-foreground"

    >
      <SendHorizontal className="h-4 w-4" />
      Испрати дневник
    </Button>
  )
}