import { format } from "date-fns";
import { Calendar } from "lucide-react";

interface PostReaderProps {
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const PostReader = ({ title, content, image_url, created_at }: PostReaderProps) => {
  return (
    <article className="max-w-3xl mx-auto py-6">
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full rounded-2xl object-cover max-h-96 mb-8"
        />
      )}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Calendar className="w-4 h-4" />
        {format(new Date(created_at), "PPPP")}
      </div>
      <div className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap text-foreground/90">
        {content}
      </div>
    </article>
  );
};

export default PostReader;
