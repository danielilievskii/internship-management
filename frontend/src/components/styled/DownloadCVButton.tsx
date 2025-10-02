import {CheckCircle, Download} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const DownloadCVButton = ({onClick, ...props}) => {

  return (
    <Button
      {...props}
      variant="outline"
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4"/>
      Преземи CV
    </Button>
  )
}