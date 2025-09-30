import React from "react";
import {texts} from "@/constants/texts.ts";

interface CommentsProps {
  week: any;
}

const InternshipWeekDescription: React.FC<CommentsProps> = ({week}) => {

  return (
    <div>
      <h4 className="font-medium mb-2">Активности:</h4>
      {week.description ? <p className="text-muted-foreground">{week.description}</p> : texts.notInserted}
    </div>
  )
};

export default InternshipWeekDescription;
