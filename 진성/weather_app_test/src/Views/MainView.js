import React from 'react';

const MainView = () => {
  return (
    <div>
      <div>
        <h1>TODAYS</h1>
        <h2>업데이트 시간 : {}</h2>
        <h2>기온 : {}도</h2>
        <h2>풍속 : {}m/s</h2>
        <h2>기후 상태 : {}</h2>
        <h2>하늘 상태 : {}</h2>
        <h2>강수 확률 : {}%</h2>
        <h2>시간 당 강수량 : {}</h2>
        <h2>습도 : {}%</h2>
      </div>
    </div>
  );
};

export default MainView;
