import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useAuthContext } from "../context/AuthContext";

/**
 * 검색 헤더 컴포넌트
 */
export default function SearchHeader() {
  // URL 파라미터에서 검색 키워드 가져오기
  const { keyword } = useParams();
  const navigate = useNavigate();
  // 입력된 검색어를 상태로 관리
  const [text, setText] = useState('');

  // 검색어가 변경될 때마다 상태 업데이트
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);

  // 검색어 제출 핸들러
  const handleSubmit = e => {
    e.preventDefault();
    // 입력된 검색어로 페이지 이동
    navigate(`/videos/${text}`);
  }

  // 인증 컨텍스트에서 사용자 정보 가져오기
  const { user, logout } = useAuthContext();

  return (
    <header>
      {/* 헤더 요소 배치 */}
      <Stack direction={'row'} sx={{alignItems: 'center'}}>
        <Grid container>
          {/* 로고와 제목 */}
          <Grid item xs={3}>
            <Link to='/' style={{textDecoration: 'none'}}>
              <Stack direction={'row'} spacing={1}>
                <YouTubeIcon color='error' fontSize="large" />
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>Youtube</Typography>
              </Stack>
            </Link>
          </Grid>
          {/* 검색 바 */}
          <Grid item xs={5}>
            <Paper
              component="form" onSubmit={handleSubmit}
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="검색..."
                value={text} 
                onChange={e => setText(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {/* 사용자 정보 및 로그인/로그아웃 버튼 */}
          <Grid item xs={4}>
            <Stack direction='row' spacing={1} justifyContent='right' alignItems='center'>
              {/* 사용자가 로그인한 경우에만 시청 기록, 사용자 이름, 로그아웃 버튼 표시 */}
              {user && <Link to='/videos/record'>시청기록</Link>}
              {user && user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} height='32' style={{borderRadius:100}} />
              )}
              {user && <p>{user.displayName}</p>}
              {user && <button onClick={logout}>로그아웃</button>}
              {/* 사용자가 로그인하지 않은 경우 로그인 링크 표시 */}
              {!user && <Link to='/signUp'>로그인</Link>}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      {/* 헤더와 본문을 구분하는 수평선 */}
      <Divider sx={{my: 1}} />
    </header>
  )
}
