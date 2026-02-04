# Flappy Bird Web

간단한 HTML5/JavaScript 기반의 Flappy Bird 웹게임입니다.

이 프로젝트는 Helpy chat과 Github mcp를 활용하여 자동으로 생성되었습니다.

## 게임 실행 방법

1. 이 저장소를 클론하거나, [Github Pages](#github-pages-배포-방법)로 바로 접속할 수 있습니다.
2. 직접 실행하려면 아래와 같이 터미널에서 명령어를 입력하세요:

```bash
python3 -m http.server 8080
```

브라우저에서 http://localhost:8080 에 접속하면 게임을 즐길 수 있습니다.

## Github Pages 배포 방법

Github Pages를 이용하면 별도의 서버 없이도 웹에서 바로 게임을 배포할 수 있습니다.

### 배포 방법
1. 저장소의 Settings > Pages 메뉴로 이동합니다.
2. "Branch"에서 main 브랜치와 / (root) 폴더를 선택합니다.
3. 저장하면 잠시 후 아래와 같은 주소로 접속할 수 있습니다:
   - `https://깃허브아이디.github.io/저장소이름/`
   - 예시: https://jjang38x.github.io/flappy-bird-web/

### 참고
- index.html과 game.js가 저장소의 최상위(root)에 있어야 합니다.
- 변경사항을 push하면 Github Pages가 자동으로 갱신됩니다.

---

문의나 개선 요청은 이슈로 남겨주세요!
