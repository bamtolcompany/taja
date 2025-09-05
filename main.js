// 로그인 상태 확인용
let currentUser = null;

// 로그인 후 토큰/사용자 이름 저장
function setLogin(user, token) {
    currentUser = user; // 예: { username: "nickname" }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token); // 토큰도 저장
    updateUI();
}

// 로그아웃
function logout() {
    currentUser = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    updateUI();
}

// 페이지 로드 시 로그인 상태 불러오기
function loadLogin() {
    const user = localStorage.getItem("user");
    if (user) {
        currentUser = JSON.parse(user);
    }
    updateUI();
}

// UI 업데이트: 로그인 상태에 따라 버튼 활성/비활성
function updateUI() {
    const userDisplay = document.getElementById("user-display");
    const saveButtons = document.querySelectorAll(".save-button");

    if (currentUser) {
        if (userDisplay) userDisplay.textContent = `로그인: ${currentUser.username}`;
        saveButtons.forEach(btn => btn.disabled = false);
    } else {
        if (userDisplay) userDisplay.textContent = "로그인 필요";
        saveButtons.forEach(btn => btn.disabled = true);
    }
}

// 기록 저장 함수 (JWT 연동, 계정 기준 저장)
function saveRecord(record) {
    if (!currentUser) {
        alert("로그인 후 이용해주세요.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
    }

    fetch("https://backend-bzep.onrender.com/api/save-record", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ record })
    })
    .then(res => res.json())
    .then(data => console.log("Record saved:", data))
    .catch(err => console.error(err));
}

// 최근 기록 불러오기 (계정 기준)
function showRecent() {
    if (!currentUser) {
        alert("로그인 후 이용해주세요.");
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("토큰이 없습니다. 다시 로그인 해주세요.");
        return;
    }

    fetch("https://backend-bzep.onrender.com/api/recent-record", {
        method: "GET",
        headers: { 
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.record) {
            alert("최근 기록:\n" + data.record);
        } else {
            alert("최근 기록이 없습니다.");
        }
    })
    .catch(err => console.error(err));
}

// 페이지 로드 시 로그인 상태 확인
window.addEventListener("DOMContentLoaded", loadLogin);

var word = document.getElementById("word");
var user = document.getElementById("user");
var submit = document.getElementById("sub");
var f = document.getElementById("f");
var c = document.getElementById("c");
var ccby = document.getElementById("ccby");
const audio = document.getElementById("myAudio");
var num = document.getElementById("num");
var progressBar = document.getElementById("progress-bar");
var words = ["가결", "가다", "가로등", "가루", "가물치", "가수", "가슴", "가해자", "강대국", "개선문", "개발", "계발", "강아지", "고양이", "결석", "경기장", "계곡"
    , "고등학교", "골프", "관측하다", "금강산", "기도", "김치", "끝말잇기", "내란", "비상계엄", "내년", "넓이", "누르스름하다", "느낌표", "다양성", "다투다", "당도", "대학교",
    "동해안", "따듯하다", "망원경", "맨홀", "머리", "문자", "민주주의", "백두산", "발광", "본진", "불법", "빙하", "삼겹살", "선착장", "쇼핑", "스님", "신부", "신용 카드",
    "쓸데없다", "안성맞춤", "안전", "앵무새", "양", "얼굴", "엔진", "영어", "외할머니", "유적", "은박지", "인공지능", "인왕산", "자본주의", "접전", "족제비", "주최", "지중해성 기후", "찌개", "찻길",
    "채식주의자", "첨성대", "체육", "치과", "타인", "태양", "팔월", "팔만대장경", "폐허", "풋과일", "폭탄", "하마", "한라산", "한마음", "핵가족", "대가족", "허영심", "현대인",
    "현금", "홍익인간", "확률", "홍대입구", "화성", "후금", "훑어보다", "흉흉하다", "힘", "대통령"];
var a = 0;
var correct = 0;
var fals = 0;
var userAnswers = [];
var correctAnswers = [];
var start;
function ran() {
    submit.innerHTML = "다음";
    if (a < 1) {
        start = performance.now();
    }
    if (user.value == word.innerHTML && a > 0 && a < 31) {
        correct++;
    } else if (user.value != word.innerHTML && a > 0 && a < 31) {
        fals++;
        userAnswers.push(user.value);
        correctAnswers.push(word.innerHTML);
    }
    if (a < 31) {
        num.innerHTML = a + "/30";
        var progress = correct / 30 * 100 * 5;
        var fprogress = fals / 30 * 100 * 5;
        progressBar.innerHTML = "<div class='divs'><div class='prbar' style='width: " + progress + "px;'></div><div class='fprbar' style='width: " + fprogress + "px;'></div></div>";
    }
    else {
        num.innerHTML = "30/30";
    }
    a++;
    if (a > 31) {
        return;
    }
    if (a > 30) {
        const end = performance.now();
        const seconds = (end - start) / 1000;
        var co_rate = Math.round((correct / 30) * 100);
        const maxTime = 300;
        let timeScore = 100 - (100 / maxTime) * seconds;
        if (seconds <= 20) {
            timeScore = 100;
        }
        timeScore = Math.round(timeScore);
        var score = timeScore * co_rate / 100;
        word.innerHTML = "끝났습니다. 맞은 횟수는 " + correct + "번, 틀린 횟수는 " + fals + "번 입니다. <br>정답율: " + co_rate + "%<br>" + "걸린시간: " + Math.round(seconds) + "초<br>" + "점수: " + Math.round(score) + "점";
        f.innerHTML = "오답: " + userAnswers;
        c.innerHTML = "정답: " + correctAnswers;

        // 계정 기준으로 기록 저장
        var re = word.innerText;
        saveRecord(re);

        if (co_rate == 100) {
            alert("축하합니다! 금메달~!");
        }
        else if (co_rate > 90) {
            alert("은메달");
        }
        else if (co_rate > 80) {
            alert("동메달");
        }

        return;
    }
    var randomword = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomword;
    user.value = "";
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        ran();
    }
});
function bgm() {
    audio.muted = false;
    audio.play();
    console.log("재생 실패:", err);
}
function show() {
    ccby.innerHTML = `저작물명<br>
국악 배경음악 #142<br>
저작(권)자<br>
주식회사 아이티앤 (저작물 1000 건)<br>
출처<br>
한국저작권위원회<br>
이용조건<br>
CC BY[저작권정보 표시]  새창열림 주식회사 아이티앤 의 "국악 배경음악 #142" 은 CC BY 라이선스로 제공됩니다.<br>
공표년도<br>
창작년도<br>
2024-10-22<br>
분류(장르)<br>
전통음악 일반,전통 음악,음악<br>
UCI 로고 UCI 코드 도움말<br>
요약정보<br>
해맑은 아무것도 모르는 순수한,<br>
저작물 파일 유형<br>
음원저작물비트 전송속도<br>
320 kbps<br>
음원저작물 해상도<br>
48 kHz<br>
음원저작물 재생시간<br>
00:01:14<br>
저작물 속성<br>
1 차 저작물<br>
분류(장르)<br>
전통음악 일반,전통 음악,음악<br>
원문제공<br>
원문파일명<br>
국악 배경음악 #142.mp3<br>
<button onclick="ccby.innerHTML = ''">접기</button>`;
}
