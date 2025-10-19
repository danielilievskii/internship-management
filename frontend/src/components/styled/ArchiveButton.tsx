import {Archive } from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const ArchiveButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      onClick={onClick}
      variant="outline"
      className=""
    >
      <Archive className="h-4 w-4" />
      Архивирај
    </Button>
  )
}