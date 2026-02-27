import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Auth = lazy(() => import("./pages/Auth"));
const Posts = lazy(() => import("./pages/Posts"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const EditPost = lazy(() => import("./pages/EditPost"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="animate-pulse text-muted-foreground">Loading...</p></div>}><Auth /></Suspense>} />
          <Route path="/posts" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="animate-pulse text-muted-foreground">Loading...</p></div>}><Posts /></Suspense>} />
          <Route path="/posts/:id" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="animate-pulse text-muted-foreground">Loading...</p></div>}><PostDetail /></Suspense>} />
          <Route path="/create-post" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="animate-pulse text-muted-foreground">Loading...</p></div>}><CreatePost /></Suspense>} />
          <Route path="/edit-post/:id" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="animate-pulse text-muted-foreground">Loading...</p></div>}><EditPost /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
