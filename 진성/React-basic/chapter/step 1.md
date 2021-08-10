# 리액트 시작

## 1.1 왜 리액트인가?

<br>

자바스크립트로 대규모의 어플리케이션을 만들때 관리하기 위해 프레임워크를 사용한다.

이와 같은 프레임워크들은 주로 MVC 아키텍처나 MVVM 아키텍처로 어플리케이션을 구조화한다.

<br>

### MVC(Model-View-Controller) 패턴이란?

<br>

-   디자인 패턴 중에 하나다.
-   Model, View, Controller로 구성하여 세 가지 역할로 구분한다.
-   사용자가 controller를 조작하여 controller를 통해 데이터를 가져오고 그 정보를 바탕으로 view에 시각적인 표현을 나타낸다.

<br>

### MVC의 요소

-   Model : 어플리케이션의 정보,데이터 즉 상태를 가지고 있다.
-   View : 사용자 인터페이스 요소를 나타낸다.
-   Controller : 사용자가 데이터를 만들거나 수정하는 이벤트를 발생시키면 그 이벤트를 처리하는 부분을 뜻한다.

<br>

<img src="https://mblogthumb-phinf.pstatic.net/MjAxNzAzMjVfMjUw/MDAxNDkwNDM4NzI4MTIy.4ZtITJJKJW_Nj1gKST0BhKMAzqmMaYIj9PobYJMFD4Ig.xTHT-0qyRKXsA4nZ2xKPNeCxeU2-tLIc-4oyrWq5WBgg.PNG.jhc9639/mvc_role_diagram.png?type=w800">

<br>

### MVC의 단점

<br>

-   새로운 기능 추가 시 시스템의 복잡도가 기하 급수적으로 증가하여 개발자는 기존 기능에 대한 영향을 주지 않을 시에 대한 불안감을 준다.
-   모델과 뷰의 수가 커지고 데이터의 흐름이 양방향으로 이루어질수록 복잡도는 더욱 증가하고 디버깅 및 코드를 이해하기 어려워지므로 대규모의 앱에 어울리지 않는다.

<br>

---

<br>

### 리액트의 이해

<br>

-   대규모의 앱을 만들면서 성능을 아끼고 편한 사용자경험을 추구하는 리액트는 프레임워크가 아닌 자바 스크립트 라이브러리로 사용자 인터페이스를 만드는데 사용한다.
    그리고 오직 **View만 신경쓰는 라이브러리**이다.
-   리액트 프로젝트에서 특정 부분이 어떻게 생길지 정하는 선언체를 컴포넌트라 부른다.
-   사용자 화면에 뷰를 보여주는 것을 렌더링이라 한다.

<br>

### 초기 렌더링

<br>

어떤 프레임 워크나 라이브버리를 사용하든지 렌더링을 다루는 함수 render함수가 있다.
<br>
이 함수는 컴포넌트가 어떻게 생겼는지 정의하는 역할을 한다. 이 함수는 html 형식의 문자열을 반환하지 않고,
뷰가 어떻게 생겼고, 어떻게 작동하는지에 대한 정보를 지닌 객체를 반환한다. 그리고 DOM 요소안에 주입을 한다.

<br>

<img src ="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtMViF%2FbtqFNrdgiBE%2FPaIbmP587GtuRbvrXo8rJ0%2Fimg.png">

<br>

<br>

### 조화과정

<br>

컴포넌트에서 데이터에 변화가 있을 때 새로운 요소로 갈아끼우는게 리렌더링 이때 render 함수가 반환하는 결과를 곧바로 DOM에 반영하지 않고, 이전에 render 함수가 만들었던 컴포넌트 정보와 현제 render 함수가 만든 컴포넌트 정보를 비교한다.

<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvgCS0%2FbtqEp01LwhC%2FJ1KnpdxP2eRPPKUslmyYdK%2Fimg.jpg" width = 700px height = 350px>

<br>

자바스크립트를 사용하여 두 가지 뷰를 최소한의 연산으로 비교한 후, 둘의 차이를 알아내 최소한의 연산으로 DOM 트리를 업데이트한다.

<br>

### Virtual DOM

<br>

1.  데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링한다.
2.  이전 Virtual DOM에 있던 내용과 현재 내용을 비교한다.
3.  바뀐 부분만 실제 DOM에 적용한다.

Virtual DOM은 변화가 일어나면 성능이 느려지는 DOM 작업을 개선하고 업데이트 처리를 간결하게 만들어준다.
그러나 정적 페이지와 같은 경우에는 적합하지 않다.
