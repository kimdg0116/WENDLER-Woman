# 웬들러 5·3·1 — 어디든 올릴 수 있는 버전

폴더 안 6개 파일이 전부입니다. 정적 호스팅에 그대로 올리면 일반 웹사이트 주소로 열립니다.

```
index.html              앱 본체 (CSS·JS 전부 포함)
manifest.webmanifest    홈 화면 앱 설정
sw.js                   오프라인 캐시 (서비스 워커)
apple-touch-icon.png    아이폰 홈 화면 아이콘 (180×180)
icon-192.png            안드로이드·데스크톱 아이콘
icon-512.png            스플래시 화면 아이콘
```

## GitHub Pages 에 올리기

1. github.com 에서 새 저장소 만들기 (Public)
2. 이 폴더의 6개 파일을 업로드 (`Add file → Upload files`)
3. `Settings → Pages → Source: Deploy from a branch → main / (root)` 저장
4. 1~2분 뒤 `https://<아이디>.github.io/<저장소이름>/` 로 열립니다

## 아이폰에 설치

사파리로 위 주소를 열고 → 공유 → **홈 화면에 추가**.
주소창 없는 전체화면으로 뜨고, 서비스 워커가 페이지를 캐시해서 **신호가 없는 지하 박스에서도 열립니다.**

## 주의

- 기록은 **브라우저별로 따로** 저장됩니다. 링크를 공유해도 서로 섞이지 않습니다.
- 대신 기기를 바꾸면 안 넘어갑니다. 앱 맨 아래 **백업** 칸 내용을 가끔 복사해 두세요.
- `sw.js` 는 HTTPS 에서만 동작합니다. GitHub Pages 는 HTTPS 라 그대로 됩니다.
- 내용을 고쳐서 다시 올릴 때는 `sw.js` 의 `CACHE = "w531-v1"` 을 `v2` 로 바꿔야 새 버전이 적용됩니다.
