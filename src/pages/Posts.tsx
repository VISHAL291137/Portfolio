import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, ArrowLeft, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PostCard from "@/components/blog/PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
  status: "open" | "in_progress" | "completed";
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => { init(); }, []);

  const init = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleData);
    }
    fetchPosts();
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts((data || []) as Post[]);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await supabase.from("posts").delete().eq("id", deleteId);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));
      toast({ title: "Deleted", description: "Post has been deleted." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setDeleteId(null);
    }
  };

  const canManagePost = (_post: Post) => !!user && isAdmin;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")} className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
            {user && isAdmin && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Admin
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Button onClick={() => navigate("/create-post")} className="gap-2 rounded-xl">
                    <PlusCircle className="w-4 h-4" />
                    New Post
                  </Button>
                )}
                <Button variant="outline" onClick={handleSignOut} className="gap-2 rounded-xl">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate("/auth")} className="gap-2 rounded-xl">
                Login to interact
              </Button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading posts...</div>
          </div>
        ) : posts.length === 0 ? (
          <Card className="border-dashed border-2 border-border/50 rounded-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <PlusCircle className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No posts yet</p>
              <Button onClick={() => navigate("/create-post")} className="rounded-xl">Create Your First Post</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                canManage={canManagePost(post)}
                onDelete={setDeleteId}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The post will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Posts;
