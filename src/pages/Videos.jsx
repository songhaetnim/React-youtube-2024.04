import React from "react";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VideoCard from "../components/VideoCard";

import { useVideo } from '../api/youtube';

// Videos 컴포넌트 정의
export default function Videos() {
  // URL 파라미터에서 keyword 가져오기
  const { keyword } = useParams();

  // useVideo 훅을 사용하여 비디오 데이터 가져오기
  const { isLoading, error, videos } = useVideo(keyword);

  return (
    <>
      {/* 로딩 중인 경우 */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {/* 오류가 발생한 경우 */}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {/* 비디오 데이터가 있는 경우 */}
      {videos && (
        // Grid 컴포넌트를 사용하여 비디오 카드들을 그리드 형태로 나타냄
        <Grid container spacing={1}>
          {/* 비디오 데이터를 반복하여 비디오 카드 생성 */}
          {videos.map(video => (
            // 그리드 아이템 설정: 창 크기에 따라 레이아웃이 변함
            <Grid item xs={12} sm={6} md={4} lg={4} key={video.id}>
              {/* VideoCard 컴포넌트에 비디오 데이터 전달 */}
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
