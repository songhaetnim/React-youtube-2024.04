import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';

// React Router의 createBrowserRouter 함수를 사용하여 라우터를 생성합니다.
// 이 함수는 경로와 해당 경로에 매칭될 요소들을 정의하는 배열을 인자로 받습니다.

const router = createBrowserRouter([
  {
    path: '/', // 앱의 기본 경로입니다.
    element: <App />, // '/' 경로에 App 컴포넌트를 렌더링합니다.
    errorElement: <NotFound />, // 경로에 오류가 발생했을 때 NotFound 컴포넌트를 렌더링합니다.
    children: [
      { index: true, element: <Videos /> },
       // '/' 경로의 하위 경로 중에 index가 true인 경우 Videos 컴포넌트를 렌더링합니다.
      { path: 'videos', element: <Videos /> }, 
      // '/videos' 경로에 Videos 컴포넌트를 렌더링합니다.
      { path: 'videos/:keyword', element: <Videos /> }, 
      // '/videos/:keyword' 경로에 Videos 컴포넌트를 렌더링합니다.
      { path: 'videos/watch/:videoId', element: <VideoDetail /> }, 
      // '/videos/watch/:videoId' 경로에 VideoDetail 컴포넌트를 렌더링합니다.
    ]
  }
]);

// ReactDOM의 createRoot 함수를 사용하여 루트를 생성합니다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 앱의 성능을 측정하고 보고하는 함수를 호출합니다.
