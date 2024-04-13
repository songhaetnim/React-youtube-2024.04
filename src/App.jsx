import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SlideshowIcon from '@mui/icons-material/Slideshow';

// React Query를 위한 QueryClient 인스턴스 생성
const queryClient = new QueryClient();

function App() {
  return (
    <>
    <SearchHeader />
      <Grid container spacing={1}>
        {/* 검색 헤더 컴포넌트를 렌더링합니다. */}
        <Grid item xs={1} sm={1} md={1} lg={1}>
          <Stack  spacing={1}>
            <HomeIcon />
            <AutoGraphIcon />
            <SubscriptionsIcon />
            <SlideshowIcon />
          </Stack>
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          {/* React Query의 QueryClientProvider로 앱 전역에서 QueryClient를 사용할 수 있도록 제공합니다. */}
          <QueryClientProvider client={queryClient}>
            {/* React Router의 Outlet 컴포넌트를 사용하여 하위 라우트를 렌더링합니다.
                Outlet은 현재 경로와 일치하는 자식 라우트를 렌더링하는 데 사용됩니다. */}
            <Outlet />
          </QueryClientProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
