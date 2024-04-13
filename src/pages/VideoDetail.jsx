import React from "react";
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChannelInfo from "../components/ChannelInfo";
import RelatedVideos from "../components/RelatedVideos";

// VideoDetail 컴포넌트 정의
export default function VideoDetail() {
  // useLocation 훅을 사용하여 현재 위치(location) 정보 가져오기
  const { state: {video} } = useLocation();

  // 비디오 데이터에서 필요한 정보 추출
  const { title, channelId, channelTitle, description } = video.snippet;

  // videoId 추출: video.id가 객체 또는 문자열인 경우를 고려하여 처리
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  return (
    <Grid container spacing={2}>
      {/* 비디오 재생 영역 */}
      <Grid item xs={9} md={9}>
        {/* 비디오 재생을 위한 iframe */}
        <Box sx={{paddingTop: '53%', height: 0, width: '100%', position: 'relative'}}>
          <iframe id='player' type='text/html' width={'100%'} height={'100%'}
            style={{position: 'absolute', top: 0, left: 0}} title={title}
            src={`https://www.youtube.com/embed/${videoId}`} />
        </Box>
        {/* 비디오 제목, 채널 정보, 설명 표시 */}
        <div>
          <h3>{title}</h3>
          {/* ChannelInfo 컴포넌트를 사용하여 채널 정보 표시 */}
          <ChannelInfo id={channelId} name={channelTitle} />
          {/* 비디오 설명 표시 */}
          <pre>{description}</pre>
        </div>
      </Grid>
      {/* 관련 동영상 목록 */}
      <Grid item xs={9} md={3}>
        {/* RelatedVideos 컴포넌트를 사용하여 관련 동영상 목록 표시 */}
        <RelatedVideos id={channelId} name={channelTitle} />
      </Grid>
    </Grid>
  )
}
