import React from 'react';
import './App.css'; // 스타일 파일을 import합니다.

function Notice() {
  return (
    <Stack direction="horizontal" spacing={10}>
      {/* 회사소개 */}
      <div className="menu-item">
        <h5>회사소개</h5>
        <p className="company-info">
          상호명: furniture<br />
          주소: 수원 휴먼교육센터 주소 16471 경기 수원시 팔달구 중부대로 104 3층
        </p>
      </div>
      
      {/* 고객센터 */}
      <div className="menu-item">
        <h5>고객센터</h5>
        <p>031-239-5855</p>
      </div>
      
      {/* 공지사항 */}
      <div className="menu-item">
        <h5>공지사항</h5>
        {/* 공지사항 내용 추가 */}
      </div>
    </Stack>
  );
}

export default Notice;







