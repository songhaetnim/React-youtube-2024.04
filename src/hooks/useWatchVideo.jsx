import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addWatchVideoRecord, getWatchVideoRecord, getWatchVideoCount } from '../api/firebase';

/**
 * 시청 동영상 관련 커스텀 훅
 * @param {object} user 현재 사용자 정보
 * @returns {object} 시청 동영상 정보를 조회하고 추가하는 데 필요한 데이터와 동작을 담은 객체
 */
export default function useWatchVideo(user) {
  // 쿼리 클라이언트 생성
  const queryClient = useQueryClient();
  // 사용자 UID 추출
  const uid = user && user.uid;

  // 동영상 시청 기록 조회 쿼리
  const getRecord = useQuery({
    queryKey: ['watchVideo'], // 쿼리 키 설정
    queryFn: getWatchVideoRecord, // 쿼리 함수 설정
    staleTime: 1000 * 60 * 5 // 데이터 유효 시간 설정 (5분)
  });

  // 사용자별 동영상 시청 횟수 조회 쿼리
  const getCount = useQuery({
    queryKey: ['watchVideo', uid], // 쿼리 키 설정 (사용자 UID 포함)
    queryFn: () => getWatchVideoCount(uid), // 쿼리 함수 설정
    staleTime: 1000 * 60 * 5 // 데이터 유효 시간 설정 (5분)
  });

  // 동영상 시청 기록 추가 뮤테이션
  const addRecord = useMutation({
    mutationFn: ({user, video}) => addWatchVideoRecord({user, video}), // 뮤테이션 함수 설정
    onSuccess: () => queryClient.invalidateQueries(['watchVideo', uid]) // 뮤테이션 성공 시 쿼리 재조회
  });

  // 시청 동영상 관련 데이터와 동작을 담은 객체 반환
  return { getRecord, getCount, addRecord };
}
