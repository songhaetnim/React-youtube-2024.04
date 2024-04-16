import React, { useState } from "react";
import { loginWithGithub, login } from '../api/firebase'; // Firebase로부터 로그인 함수 가져오기
import { useNavigate, Link } from "react-router-dom"; // React Router의 사용 네비게이션 및 링크 컴포넌트 가져오기

export default function SignIn() {
  // 사용자 정보 상태 초기화
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  // React Router의 네비게이션 훅 사용
  const navigate = useNavigate();
  
  // 입력값 변경 시 사용자 정보 상태 업데이트
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  
  // 폼 제출 시 로그인 함수 호출 및 이전 페이지로 이동
  const handleSubmit = e => {
    e.preventDefault(); // 기본 이벤트 방지
    login(userInfo); // 로그인 함수 호출
    navigate(-1); // 이전 페이지로 이동
  }
  
  // 깃허브 로그인 함수 호출 및 이전 페이지로 이동
  const handleGithub = e => {
    loginWithGithub(); // 깃허브 로그인 함수 호출
    navigate(-1); // 이전 페이지로 이동
  }

  return (
    <div style={{margin: '20px'}}>
      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        {/* 이메일 입력 필드 */}
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        {/* 비밀번호 입력 필드 */}
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        {/* 로그인 버튼 */}
        <button onClick={handleSubmit}>로그인</button>
      </form><br />
      
      {/* 회원가입 페이지로 이동하는 링크 */}
      <span>아직 계정이 없으신가요?</span>
      <Link to='/signUp'>사용자 등록</Link><br /><br />
      
      {/* 깃허브 로그인 버튼 */}
      <button onClick={handleGithub}>깃허브 로그인</button>
    </div>
  )
}
