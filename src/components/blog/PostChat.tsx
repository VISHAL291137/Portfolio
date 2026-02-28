import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  post_id: string;
  user_id: string;
  user_email: string;
  content: string;
  created_at: string;
  is_deleted: boolean;
}

interface PostChatProps {
  postId: string;
  userId: string | null;
  userEmail: string | null;
  isAdmin: boolean;
}

const PostChat = ({ postId, userId, userEmail, isAdmin }: PostChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel(`chat-${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_chat_messages", filter: `post_id=eq.${postId}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setMessages((prev) => [...prev, payload.new as Message]);
          } else if (payload.eventType === "UPDATE") {
            setMessages((prev) => prev.map((m) => (m.id === (payload.new as Message).id ? (payload.new as Message) : m)));
          } else if (payload.eventType === "DELETE") {
            setMessages((prev) => prev.filter((m) => m.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [postId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("post_chat_messages")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (!error && data) setMessages(data);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setSending(true);
    setInput("");
    try {
      const { error } = await supabase.from("post_chat_messages").insert({
        post_id: postId,
        user_id: userId,
        user_email: userEmail,
        content: text,
      });
      if (error) throw error;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("post_chat_messages")
        .update({ is_deleted: true })
        .eq("id", id);
      if (error) throw error;
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-col h-[500px] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto space-y-1 py-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">No messages yet. Start the conversation!</p>
        )}
        {messages.map((m) => (
          <ChatMessage
            key={m.id}
            id={m.id}
            userEmail={m.user_email}
            content={m.content}
            createdAt={m.created_at}
            isDeleted={m.is_deleted}
            isOwn={!!userId && m.user_id === userId}
            canModerate={!!userId && isAdmin}
            onDelete={handleDelete}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      {userId ? (
        <div className="border-t pt-3 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            disabled={sending}
            className="rounded-xl"
          />
          <Button onClick={handleSend} disabled={sending || !input.trim()} size="icon" className="rounded-xl shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="border-t pt-3 text-center">
          <p className="text-sm text-muted-foreground">
            <a href="/auth" className="text-primary hover:underline font-medium">Log in</a> to join the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default PostChat;
