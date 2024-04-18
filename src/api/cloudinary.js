// 이미지 업로드 함수
export async function uploadImage(file) {
  // FormData 객체 생성
  const data = new FormData();
  // FormData에 파일 및 업로드 프리셋 추가
  data.append('file', file); // 파일 추가
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); // 업로드 프리셋 추가

  // 클라우드너리 업로드 URL로 POST 요청 전송하여 이미지 업로드
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST', // POST 메서드 사용
      body: data, // FormData를 요청의 본문으로 설정
    })
      .then(res => res.json()) // JSON 형식으로 응답 변환
      .then(data => {
        console.log(data); // 업로드 결과 콘솔 출력
        return data.url; // 업로드된 이미지의 URL 반환
      });
}
