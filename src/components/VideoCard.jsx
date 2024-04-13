import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function VideoCard({ video }) {
  // 페이지 이동 함수를 가져옵니다.
  const navigate = useNavigate();
  // 비디오 객체에서 필요한 정보들을 비구조화 할당하여 가져옵니다.
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  // 비디오 ID를 가져옵니다. 만약 비디오 ID가 문자열이 아니라면, 비디오 객체에서 'videoId'를 가져옵니다.
  const videoId = typeof(video.id) === 'string' ? video.id : video.id.videoId;

  return (
    // 카드를 클릭했을 때, 해당 비디오를 시청하는 페이지로 이동하도록 설정합니다.
    <Card onClick={() => { navigate(`/videos/watch/${videoId}`, {state: {video} }) }}>
      {/* 카드의 내용을 구성하는 컴포넌트인 CardContent를 사용합니다. */}
      <CardContent>
        {/* 비디오의 썸네일 이미지를 표시합니다. */}
        <img src={thumbnails.medium.url} alt={title} />
        {/* 비디오의 제목, 채널 제목, 등록 날짜를 표시합니다. */}
        <div>
          {/* 제목을 표시하는 Typography 컴포넌트입니다. */}
          <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{title}</Typography>
          {/* 채널 제목을 표시하는 Typography 컴포넌트입니다. */}
          <Typography>{channelTitle}</Typography>
          {/* 등록 날짜를 한국어로 변환하여 표시하는 Typography 컴포넌트입니다. */}
          <Typography>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
