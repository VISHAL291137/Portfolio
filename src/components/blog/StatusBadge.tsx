import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PostStatus = "open" | "in_progress" | "completed";

const statusConfig: Record<PostStatus, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100" },
  in_progress: { label: "In Progress", className: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100" },
  completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100" },
};

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.open;
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className, className)}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
