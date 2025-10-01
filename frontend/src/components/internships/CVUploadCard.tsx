import React from "react";
import { Upload, Download, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CVUploadCardProps {
  selectedCV: File | null;
  cvSubmitted: boolean;
  handleCVUpload: () => void;
  handleCancelSubmit: () => void;
  handleDownloadCV: () => void;
}

const CVUploadCard: React.FC<CVUploadCardProps> = ({
                                                     selectedCV,
                                                     cvSubmitted,
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
          {cvSubmitted && selectedCV && (
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
            selectedCV
              ? 'border-primary bg-primary/5 border-solid'
              : 'border-muted-foreground/25'
          }`}
        >
          {selectedCV ? (
            <Check className="h-12 w-12 mx-auto mb-4 text-primary" />
          ) : (
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          )}
          <p className="mb-4">
            {selectedCV
              ? `Избрана датотека: ${selectedCV.name}`
              : 'Повлечете го вашето CV овде или кликнете за да изберете'
            }
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleCVUpload}
              variant={selectedCV ? "outline" : "default"}
            >
              {selectedCV ? 'Променете датотека' : 'Изберете датотека'}
            </Button>
            {selectedCV && (
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
