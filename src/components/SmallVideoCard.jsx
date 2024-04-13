import React from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { formatAgo } from "../util/date";

export default function SmallVideoCard({ video }) {
  // React Router의 useNavigate 훅을 사용하여 페이지 이동 함수를 가져옵니다.
  const navigate = useNavigate();
  // 비디오의 정보를 비구조화 할당하여 가져옵니다.
  const { id, snippet } = video;
  const { videoId } = id;
  const { title, thumbnails, publishedAt } = snippet;

  // 카드를 클릭했을 때, 해당 비디오를 시청하는 페이지로 이동하는 핸들러 함수입니다.
  const handleClick = () => {
    navigate(`/videos/watch/${videoId}`, { state: { video } });
  };

  return (
    // Material-UI의 Card 컴포넌트를 사용하여 카드를 생성합니다.
    // 클릭 이벤트가 발생하면 handleClick 함수를 실행합니다.
    <Card onClick={handleClick}>
      {/* Material-UI의 Stack 컴포넌트를 사용하여 요소들을 수평으로 배열합니다. */}
      <Stack direction={'row'} spacing={1}>
        {/* 비디오의 썸네일 이미지를 표시합니다. */}
        <img src={thumbnails.medium.url} alt={title} width={'40%'} />
        {/* 비디오의 제목과 등록 날짜를 표시합니다. */}
        <div style={{textAlign: 'left'}}>
          {/* Material-UI의 Typography 컴포넌트를 사용하여 제목을 표시합니다. */}
          <Typography sx={{fontSize: 14}}>{title}</Typography>
          {/* 등록 날짜를 한국어로 변환하여 표시합니다. */}
          <Typography sx={{fontSize: 14}}>{formatAgo(publishedAt, 'ko')}</Typography>
        </div>
      </Stack>
    </Card>
  );
}
