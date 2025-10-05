import React, {useState} from "react";
import {MessageSquare} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {User} from "@/types/internship.ts";

interface CommentsProps {
  user: User
  week: any;
  internshipDetails: any;
  canCoordinatorComment?: boolean;
  canCompanyComment?: boolean;
  newComment: string;
  setNewComment: (value: string) => void;
  commentWeekId: string;
  setCommentWeekId: (value: string) => void;
  handleAddComment: (weekId: string) => void;
}

const InternshipWeekComments: React.FC<CommentsProps> = ({
                                                           user,
                                                           week,
                                                           internshipDetails,
                                                           newComment,
                                                           setNewComment,
                                                           commentWeekId,
                                                           setCommentWeekId,
                                                           handleAddComment,
                                                         }) => {

  const isEditMode = commentWeekId == week.id

  const hasCompanyComment = Boolean(week.companyComment);
  const hasCoordinatorComment = Boolean(week.coordinatorComment);
  const hasComments = hasCompanyComment || hasCoordinatorComment;

  // TODO: Add validations by user.id instead of name
  const canCompanyComment = user?.role === 'Company'
    && internshipDetails?.status == 'JOURNAL_SUBMITTED'
    && user.name.includes(internshipDetails?.companyView?.name)

  // TODO: Add validations by user.id instead of name
  const canCoordinatorComment = user?.role === 'Coordinator'
    && internshipDetails?.status == 'VALIDATED_BY_COMPANY'
    && user.name.includes(internshipDetails?.coordinatorView?.name)

  const canComment = canCoordinatorComment || canCompanyComment;

  const buttonText = (user?.role === 'Company' && hasCompanyComment)
    ? 'Ажурирај коментар'
    : (user?.role === 'Coordinator' && hasCoordinatorComment)
      ? 'Ажурирај коментар'
      : 'Додај коментар'

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

      {canComment && (
        <div className="pt-2 border-t">
          {!isEditMode ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCommentWeekId(week.id)}
            >
              {buttonText}
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
                  Зачувај
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setNewComment("")
                    setCommentWeekId(null)
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
