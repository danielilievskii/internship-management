import React from "react";
import { Upload, Download, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CVUploadCardProps {
  displayedCV: File | null;
  handleCVUpload: () => void;
  handleCancelSubmit: () => void;
  handleDownloadCV: () => void;
}

const CVUploadCard: React.FC<CVUploadCardProps> = ({
                                                     displayedCV,
                                                     handleCVUpload,
                                                     handleCancelSubmit,
                                                     handleDownloadCV
                                                   }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              CV
            </CardTitle>
            <CardDescription>
              Прикачете го вашето CV за да можете да аплицирате за пракси
            </CardDescription>
          </div>
          {displayedCV && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCV}
              className="shrink-0"
            >
              <Download className="h-4 w-4 mr-2" />
              Симни
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            displayedCV
              ? 'border-primary bg-primary/5 border-solid'
              : 'border-muted-foreground/25'
          }`}
        >
          {displayedCV ? (
            <Check className="h-12 w-12 mx-auto mb-4 text-primary" />
          ) : (
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          )}
          <p className="mb-4">
            {displayedCV
              ? `Избрана датотека: ${displayedCV.name}`
              : 'Повлечете го вашето CV овде или кликнете за да изберете'
            }
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleCVUpload}
              variant={displayedCV ? "outline" : "default"}
            >
              {displayedCV ? 'Променете датотека' : 'Изберете датотека'}
            </Button>
            {displayedCV && (
              <Button
                onClick={handleCancelSubmit}
                variant="destructive"
              >
                Откажи пребарување
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVUploadCard;
