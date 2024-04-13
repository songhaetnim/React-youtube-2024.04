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
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export default function SearchHeader() {
  // URL 파라미터에서 검색 키워드 가져오기
  const { keyword } = useParams();
  // 페이지 이동 함수 가져오기
  const navigate = useNavigate();
  // 검색어 상태와 업데이트 함수
  const [text, setText] = useState('');
  
  // URL 파라미터로부터 받은 검색 키워드로 검색어 상태 업데이트
  useEffect(() => {
    setText(keyword || ''); // URL 파라미터로부터 검색 키워드를 가져와 검색어 상태 업데이트
  }, [keyword]);

  // 검색어 제출 핸들러
  const handleSubmit = e => {
    e.preventDefault(); // 기본 제출 이벤트 방지
    navigate(`/videos/${text}`); // 검색어를 포함한 URL로 페이지 이동
  }

  return (
    <header>
      {/* 로고와 검색 입력란을 수평으로 배열한 Stack 컴포넌트 */}
      <Stack direction={'row'} sx={{alignItems: 'center'}}>
        <Grid container>
          {/* 로고와 타이틀 */}
          <Grid item xs={3}>
            {/* 홈 페이지로 이동하는 링크 */}
            <Stack direction={'row'} spacing={1}>
              <MenuIcon fontSize="large" />
              <Link to='/' style={{textDecoration: 'none'}} >
              {/* 로고와 타이틀을 수평으로 배열한 Stack 컴포넌트 */}
                {/* YouTube 아이콘 */}
                <Stack direction={'row'} spacing={1}>
                  <YouTubeIcon color='error' fontSize="large" />
                  {/* YouTube 타이틀 */}
                  <Typography variant="h4" color='black' sx={{fontWeight: 'bold'}}>Youtube</Typography>
                </Stack>
              </Link>
            </Stack>
          </Grid>
          {/* 검색 입력란 */}
          <Grid item xs={6}>
            {/* 검색 입력란을 갖는 Paper 컴포넌트 */}
            <Paper
              component="form" onSubmit={handleSubmit} // 검색어 제출 핸들러 설정
              sx={{ p:'2px 4px', display:'flex', alignItems:'center', width:'100%', borderRadius:50}}
            >
              {/* 검색어 입력 필드 */}
              <InputBase
                sx={{ ml: 1, flex: 1, }} // 스타일링
                
                placeholder="검색" // 플레이스홀더 텍스트
                value={text} // 검색어 상태와 연결된 값
                onChange={e => setText(e.target.value)} // 검색어가 변경될 때마다 상태 업데이트
              />
              <KeyboardIcon />
              {/* 수직 구분선 */}
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              {/* 검색 버튼 */}
              <IconButton type="button" sx={{ p: 1 }} aria-label="search" onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          {/* 공백 */}
          <Grid item xs={3}></Grid>
        </Grid>
      </Stack>
      {/* 수평 구분선 */}
      <Divider sx={{my: 1}} />
    </header>
  )
}
