import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";

interface ChatMessageProps {
  id: string;
  userEmail: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  isOwn: boolean;
  canModerate: boolean;
  onDelete: (id: string) => void;
}

const ChatMessage = ({ id, userEmail, content, createdAt, isDeleted, isOwn, canModerate, onDelete }: ChatMessageProps) => {
  if (isDeleted) {
    return (
      <div className="py-2 px-4 text-xs text-muted-foreground italic">
        This message was deleted.
      </div>
    );
  }

  return (
    <div className={`group flex gap-3 py-3 px-4 rounded-xl hover:bg-muted/40 transition-colors ${isOwn ? "bg-primary/5" : ""}`}>
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
        {userEmail.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium truncate">{userEmail}</span>
          <span className="text-xs text-muted-foreground">{format(new Date(createdAt), "p")}</span>
        </div>
        <p className="text-sm text-foreground/90 break-words">{content}</p>
      </div>
      {(isOwn || canModerate) && (
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-destructive hover:text-destructive"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
