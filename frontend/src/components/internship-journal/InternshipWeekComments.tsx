import React, {useState} from "react";
import {MessageSquare} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface CommentsProps {
  week: any;
  internshipDetails: any;
  canCoordinatorComment?: boolean;
  canCompanyComment?: boolean;
  setIsAddingComment: (value: boolean) => void;
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: (weekId: number) => void;
}

const InternshipWeekComments: React.FC<CommentsProps> = ({
                                                           week,
                                                           internshipDetails,
                                                           canCoordinatorComment,
                                                           canCompanyComment,
                                                           newComment,
                                                           setNewComment,
                                                           handleAddComment,
                                                         }) => {

  const [addCommentWeekId, setAddCommentWeekId] = useState<string | null>(null);
  const isAddingComment = addCommentWeekId == week.id

  const hasComments = week.companyComment || week.coordinatorComment;
  const canComment = canCoordinatorComment || canCompanyComment;

  return (
    <div className="pt-2">
      {hasComments && (
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4"/>
            Коментари:
          </h4>

          {week.companyComment && (
            <div className="space-y-2 mb-2">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <span>{internshipDetails?.companyView?.name}</span>
                </div>
                <p>{week.companyComment}</p>
              </div>
            </div>
          )}

          {week.coordinatorComment && (
            <div className="space-y-2 mb-2">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                  <span>{internshipDetails?.coordinatorView?.name}</span>
                </div>
                <p>{week.coordinatorComment}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {(canComment) && (
        <div className="pt-2 border-t">
          {!isAddingComment ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAddCommentWeekId(week.id)}
            >
              Додај коментар
            </Button>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Внесете го вашиот коментар..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddComment(week.id)}>
                  Додај коментар
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewComment("")
                    setAddCommentWeekId(null)
                  }}
                >
                  Откажи
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InternshipWeekComments;
