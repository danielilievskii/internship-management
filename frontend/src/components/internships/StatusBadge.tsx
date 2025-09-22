import { InternshipStatus } from '@/types/internship.ts';
import { Badge } from '@/components/ui/badge.tsx';

interface StatusBadgeProps {
  status: InternshipStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: InternshipStatus) => {
    switch (status) {
      case 'SEARCHING':
        return {
          label: 'SEARCHING',
          className: 'bg-status-searching text-status-searching-foreground'
        };
      case 'SUBMITTED':
        return {
          label: 'SUBMITTED',
          className: 'bg-status-submitted text-status-submitted-foreground'
        };
      case 'ACCEPTED':
        return {
          label: 'ACCEPTED',
          className: 'bg-status-accepted text-status-accepted-foreground'
        };
      case 'REJECTED':
        return {
          label: 'REJECTED',
          className: 'bg-status-rejected text-status-rejected-foreground'
        };
      case 'JOURNAL_SUBMITTED':
        return {
          label: 'JOURNAL SUBMITTED',
          className: 'bg-status-journal-submitted text-status-journal-submitted-foreground'
        };
      case 'VALIDATED':
        return {
          label: 'VALIDATED',
          className: 'bg-status-validated text-status-validated-foreground'
        };
      case 'INVALIDATED':
        return {
          label: 'INVALIDATED',
          className: 'bg-status-rejected text-status-rejected-foreground'
        };
      case 'ARCHIVED':
        return {
          label: 'ARCHIVED',
          className: 'bg-muted text-muted-foreground'
        };
      default:
        return {
          label: status,
          className: 'bg-muted text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;