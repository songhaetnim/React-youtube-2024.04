import React, { useState } from "react";
import { register, loginWithGithub, logout, login } from '../api/firebase'; // Firebase에서 로그인, 회원가입, 로그아웃 함수 가져오기
import { uploadImage } from "../api/cloudinary"; // Cloudinary에 이미지 업로드 함수 가져오기
import { useNavigate } from "react-router-dom"; // React Router의 네비게이션 훅 가져오기

export default function SignUp() {
  // 사용자 정보 및 파일 상태 초기화
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const [file, setFile] = useState();
  const navigate = useNavigate(); // React Router의 네비게이션 훅 사용
  
  // 입력값 변경 시 사용자 정보 상태 업데이트
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  
  // 폼 제출 시 회원가입 함수 호출 및 로그인 페이지로 이동
  const handleSubmit = e => {
    e.preventDefault(); // 기본 이벤트 방지
    register(userInfo); // 회원가입 함수 호출
    navigate('/signIn'); // 로그인 페이지로 이동
  }
  
  // 깃허브 로그인 함수 호출 및 이전 페이지로 이동
  const handleGithub = e => {
    loginWithGithub(); // 깃허브 로그인 함수 호출
    navigate(-1); // 이전 페이지로 이동
  }
  
  // 로그아웃 함수 호출
  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
  }
  
  // 파일 업로드 및 Cloudinary에 이미지 업로드 후 사용자 정보 업데이트
  const handleUpload = e => {
    setFile(e.target.files && e.target.files[0]); // 파일 상태 업데이트
    // Cloudinary에 이미지 업로드
    uploadImage(file)
      .then(url => setUserInfo({...userInfo, ['photo']: url})); // 사용자 정보 상태 업데이트
  }
  
  // 로그인 함수 호출 및 이전 페이지로 이동
  const handleLogin = () => {
    login(userInfo); // 로그인 함수 호출
    navigate(-1); // 이전 페이지로 이동
  }

  return (
    <div style={{margin: '20px'}}>
      {/* 회원가입 폼 */}
      <form onSubmit={handleSubmit}>
        {/* 이메일 입력 필드 */}
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        {/* 패스워드 입력 필드 */}
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        {/* 이름 입력 필드 */}
        <input type="text" name='name' value={userInfo.name} placeholder="이름"
          onChange={handleChange} /><br />
        {/* 파일 업로드 입력 필드 */}
        <input type="file" accept="image/*" name='file' onChange={handleUpload} /><br />
        {/* 사용자 등록 버튼 */}
        <button onClick={handleSubmit}>사용자 등록</button>
        {/* 로그인 버튼 */}
        <button onClick={handleLogin}>로그인</button>
        {/* 로그아웃 버튼 */}
        <button onClick={handleLogout}>로그아웃</button>
      </form><br />
      
      {/* 깃허브 로그인 버튼 */}
      <button onClick={handleGithub}>깃허브 로그인</button>
      
      {/* 업로드한 이미지 미리 보기 */}
      {file && (<img src={URL.createObjectURL(file)} alt='photo' />)}
    </div>
  )
}
