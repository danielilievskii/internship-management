import {ArrowLeft, FileText, SendHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const BackButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      variant="outline"
      className="flex items-center gap-2 "
    >
      <ArrowLeft className="h-4 w-4"/>
      Назад
    </Button>
  )
}