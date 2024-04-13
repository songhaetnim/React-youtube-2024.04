import React from "react";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Stack from '@mui/material/Stack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SmallVideoCard from "./SmallVideoCard";

import { useRelatedVideo } from "../api/youtube";

// RelatedVideos 컴포넌트 정의
export default function RelatedVideos({ id, name }) {
  // useRelatedVideo 훅을 사용하여 관련된 비디오들을 가져오기
  const {isLoading, error, videos} = useRelatedVideo(id);

  return (
    <>
      {/* 로딩 중인 경우 */}
      {isLoading && <p><HourglassTopIcon /> Loading...</p>}
      {/* 오류가 발생한 경우 */}
      {error && <p><WarningAmberIcon /> Something is wrong!!!</p>}
      {/* 비디오들이 있는 경우 */}
      {videos && (
        <Stack direction={'column'} spacing={1} sx={{textAlign: 'center'}}>
          {/* 섹션 제목 */}
          <h4>이 채널의 다른 영상들</h4>
          {/* 비디오들을 작은 카드 형식으로 표시 */}
          {videos.map(video => (<SmallVideoCard video={video} />))}
        </Stack>
      )}
    </>
  )
}
