// 웹 애플리케이션의 성능을 측정하고 보고하는 함수를 정의합니다.
const reportWebVitals = onPerfEntry => {
  // onPerfEntry가 함수이고, 함수인 경우에만 성능 측정을 진행합니다.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // web-vitals 패키지를 비동기적으로 가져와서 성능 지표를 얻고 보고합니다.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // 각 성능 지표를 가져와서 onPerfEntry 함수에 전달하여 보고합니다.
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// reportWebVitals 함수를 내보냅니다.
export default reportWebVitals;
