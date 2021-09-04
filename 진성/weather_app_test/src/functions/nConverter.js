//기상청 api에서 받은 데이터의 수치를 사용자가 한눈에 인식할 수 있게 해당 수치의 정보를 문자열로 변환한다.

function nConverter(key, value) {
  switch (key) {
    case 'PCP': {
      if (value < 1.0) return '기분 나쁘게 오는 비(조금 온다)';
      else if (value >= 1.0 && value < 30.0)
        return '슬리퍼 신고 다녀야됨..(좀 온다)';
      else if (value >= 30.0 && value < 50.0)
        return '야...야 베란다 문 닫아.(ㅈㄴ 온다)';
      else if (value === '강수없음') return '강수 없음';
      else return '야야 물 ㅈㄴ 들어와 물(나가면 안될 정도의 강수량)';
    }

    case 'PTY': {
      if (value === '0') return '없음';
      else if (value === '1') return '비';
      else if (value === '2') return '비/눈';
      else if (value === '3') return '눈';
      else if (value === '4') return '소나기';
      else return '잘못된 입력값' + value;
    }

    case 'SKY': {
      if (value === '1') return '맑음';
      else if (value === '3') return '구름 많음';
      else if (value === '4') return '흐림';

      break;
    }

    default: {
      return '잘못된 입력값';
    }
  }
}

export default nConverter;
