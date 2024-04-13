import React from "react";

// NotFound 컴포넌트 정의
export default function NotFound() {
  return (
    <div style={{margin: '20px'}}>
      {/* "Page Not Found!!!" 메시지를 표시하는 제목 */}
      <h1>Page Not Found!!!</h1>
      {/* 오류 이미지를 표시하는 이미지 요소 */}
      <img src='/img/not-found.svg' alt='error' />
    </div>
  )
}
