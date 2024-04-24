import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import WatchRecord from "../components/WatchRecord";
import { useAuthContext } from "../context/AuthContext";
// import { getWatchVideoRecord } from '../api/firebase';
import useWatchVideo from '../hooks/useWatchVideo';

export default function ViewRecord() {
  const {user} = useAuthContext();
  // const [records, setRecords] = useState();
  // getWatchVideoRecord(user.uid)
  //   .then(setRecords);
  const { getRecord: { isLoading, error, data: totalRecords}} = useWatchVideo(user);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>나의 시청기록</Typography>
      {isLoading && <img src='/img/loading.gif' alt='Loading...' />}
      {error && <img src='/img/error.png' alt='Error occurred!!!' />}
      {user && totalRecords[user.displayName] && (
        <Grid container spacing={1}>
          {totalRecords[user.displayName].map(record => (
            <Grid item xs={12} md={6} xl={4}>
              <WatchRecord record={record} key={record.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}






// import React from "react";
// import Grid from '@mui/material/Grid'; // Material-UI의 Grid 컴포넌트를 불러옵니다.
// import Typography from '@mui/material/Typography'; // Material-UI의 Typography 컴포넌트를 불러옵니다.

// import WatchRecord from "../components/WatchRecord"; // WatchRecord 컴포넌트를 불러옵니다.
// import { useAuthContext } from "../context/AuthContext"; // AuthContext에서 useAuthContext 훅을 불러옵니다.
// // import { getWatchVideoRecord } from '../api/firebase'; // Firebase에서 시청 기록을 가져오는 함수를 불러옵니다. (주석 처리됨)
// import useWatchVideo from '../hooks/useWatchVideo'; // 시청 비디오 데이터를 처리하기 위한 커스텀 훅을 불러옵니다.

// export default function ViewRecord() {
//   const {user} = useAuthContext(); // useAuthContext 훅을 사용하여 사용자 정보를 가져옵니다.
//   // const [records, setRecords] = useState(); // 시청 기록을 위한 상태 (주석 처리됨)
//   // getWatchVideoRecord(user.uid)
//   //   .then(setRecords);
//   const { getRecord: { isLoading, error, data: totalRecords}} = useWatchVideo(user); // 사용자의 시청 비디오 데이터를 가져오는 커스텀 훅을 사용합니다.

//   return (
//     <>
//       {/* 제목을 표시하는 헤더 */}
//       <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>나의 시청기록</Typography>
//       {/* 로딩 중일 때 로딩 이미지를 표시 */}
//       {isLoading && <img src='/img/loading.gif' alt='Loading...' />}
//       {/* 오류가 발생했을 때 오류 이미지를 표시 */}
//       {error && <img src='/img/error.png' alt='Error occurred!!!' />}
//       {/* 사용자가 로그인되어 있고 사용자의 기록이 있는 경우에만 표시 */}
//       {user && totalRecords[user.displayName] && (
//         {/* 시청 기록을 표시하기 위한 그리드 레이아웃 */}
//         <Grid container spacing={1}>
//           {/* 사용자의 각 기록을 매핑하고 WatchRecord 컴포넌트를 렌더링합니다. */}
//           {totalRecords[user.displayName].map(record => (
//             <Grid item xs={12} md={6} xl={4} key={record.id}>
//               <WatchRecord record={record} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </>
//   )
// }



// 이 코드에서 빨간 줄이 나타나는 이유는 일반적으로
// totalRecords[user.displayName]가 undefined인 경우에 발생합니다. 
//즉, totalRecords 객체에서 user.displayName에 해당하는 값이 없거나
// totalRecords 자체가 undefined일 때 발생합니다.
//이런 경우를 방지하기 위해 다음과 같이 코드를 수정할 수 있습니다:

// {user && totalRecords && totalRecords[user.displayName] && (
//   <Grid container spacing={1}>
//     {totalRecords[user.displayName].map(record => (
//       <Grid item xs={12} md={6} xl={4} key={record.id}>
//         <WatchRecord record={record} />
//       </Grid>
//     ))}
//   </Grid>
// )}

//이렇게 수정하면 user와 totalRecords가 정의되어 있고
//totalRecords[user.displayName]도 존재하는 경우에만 Grid와 WatchRecord 컴포넌트가 렌더링됩니다.
//이렇게 하면 에러를 방지할 수 있습니다.








