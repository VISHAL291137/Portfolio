import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen, Sparkles, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PostReader from "@/components/blog/PostReader";
import PostSummary from "@/components/blog/PostSummary";
import PostChat from "@/components/blog/PostChat";
import StatusBadge from "@/components/blog/StatusBadge";

type PostStatus = "open" | "in_progress" | "completed";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
  status: PostStatus;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    init();
  }, [id]);

  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }
    setUser(session.user);

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!roleData);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id!)
      .single();

    if (error || !data) {
      toast({ title: "Post not found", variant: "destructive" });
      navigate("/posts");
      return;
    }
    setPost(data as Post);
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: PostStatus) => {
    if (!post) return;
    const { error } = await supabase
      .from("posts")
      .update({ status: newStatus })
      .eq("id", post.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPost({ ...post, status: newStatus });
      toast({ title: "Status updated" });
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/posts")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <StatusBadge status={post.status} />
          </div>
          {isAdmin && (
            <Select value={post.status} onValueChange={(v) => handleStatusChange(v as PostStatus)}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="read" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="read" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Read
            </TabsTrigger>
            <TabsTrigger value="understand" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Understand
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="read">
            <PostReader
              title={post.title}
              content={post.content}
              image_url={post.image_url}
              created_at={post.created_at}
            />
          </TabsContent>

          <TabsContent value="understand">
            <PostSummary postId={post.id} content={post.content} />
          </TabsContent>

          <TabsContent value="chat">
            <PostChat
              postId={post.id}
              userId={user.id}
              userEmail={user.email}
              isAdmin={isAdmin}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PostDetail;
