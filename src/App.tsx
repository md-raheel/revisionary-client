import { Suspense } from "react";
import AppRoutes from "@/routes";
import AppTheme from "@/configs/Theme";
import { PageLoader } from "@/components";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/configs/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <AppTheme>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
          </Suspense>

          <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
