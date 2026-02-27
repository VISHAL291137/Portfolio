import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PostSummaryProps {
  postId: string;
  content: string;
}

const PostSummary = ({ postId, content }: PostSummaryProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("summarize-post", {
        body: { postId, content },
      });
      if (error) throw error;
      setSummary(data.summary);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to generate summary", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!summary && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Sparkles className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center max-w-md">
          Get an AI-generated simplified summary of this post to understand it quickly.
        </p>
        <Button onClick={fetchSummary} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Summary
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-8 space-y-4 max-w-3xl mx-auto">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">AI Summary</h2>
      </div>
      <div className="bg-muted/50 rounded-2xl p-6 leading-relaxed whitespace-pre-wrap text-foreground/90">
        {summary}
      </div>
      <Button variant="outline" size="sm" onClick={fetchSummary} className="mt-4 gap-2">
        <Sparkles className="w-3 h-3" />
        Regenerate
      </Button>
    </div>
  );
};

export default PostSummary;
