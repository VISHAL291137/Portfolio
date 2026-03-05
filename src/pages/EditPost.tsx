import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUserAndFetchPost();
  }, []);

  const checkUserAndFetchPost = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id!)
      .single();

    if (error || !data) {
      toast({ title: "Error", description: "Post not found", variant: "destructive" });
      navigate("/posts");
      return;
    }

    // Only admin can edit
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({ title: "Unauthorized", description: "Only admins can edit posts.", variant: "destructive" });
      navigate("/posts");
      return;
    }

    setTitle(data.title);
    setContent(data.content);
    setImageUrl(data.image_url || "");
    setFetching(false);
  };

  const isValidImageUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrl && !isValidImageUrl(imageUrl)) {
      toast({ title: "Invalid URL", description: "Image URL must use HTTP or HTTPS protocol", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("posts")
        .update({ title, content, image_url: imageUrl || null })
        .eq("id", id!);

      if (error) throw error;

      toast({ title: "Updated!", description: "Post has been updated." });
      navigate("/posts");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="outline" onClick={() => navigate("/posts")} className="mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Posts
        </Button>

        <Card className="border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Edit Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required className="min-h-[200px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input id="imageUrl" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditPost;
