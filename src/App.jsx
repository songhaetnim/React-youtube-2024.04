import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthContextProvider } from './context/AuthContext';
import SearchHeader from './components/SearchHeader';

// 쿼리 클라이언트를 생성합니다.
const queryClient = new QueryClient();

/**
 * 애플리케이션의 최상위 컴포넌트입니다.
 * @returns {JSX.Element} 애플리케이션의 레이아웃 및 라우팅 설정을 포함하는 JSX 요소
 */
function App() {
  return (
    <AuthContextProvider> {/* 인증 컨텍스트를 제공하는 컴포넌트 */}
      <QueryClientProvider client={queryClient}> {/* 쿼리 클라이언트를 제공하는 컴포넌트 */}
        {/* 검색 헤더를 표시하는 컴포넌트 */}
        <SearchHeader />
        {/* 라우팅된 컴포넌트를 렌더링하는 Outlet */}
        <Outlet />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;


