var word = document.getElementById("word");
var user = document.getElementById("user");
var submit = document.getElementById("sub");
var f = document.getElementById("f");
var c = document.getElementById("c");
var ccby = document.getElementById("ccby");
const audio = document.getElementById("myAudio");
var words = ["가결", "가다", "가로등", "가루", "가물치", "가수", "가슴", "가해자", "강대국", "밤톨컴퍼니", "개선문", "개발", "계발", "강아지", "고양이", "결석", "경기장", "계곡"
         , "고등학교", "골프", "관측하다", "금강산", "기도", "김치", "끝말잇기", "내란", "비상계엄", "윤석열", "내년", "넓이", "누르스름하다", "느낌표", "다양성", "다투다", "당도", "대학교", 
         "동해안", "따듯하다", "망원경", "맨홀", "머리", "문자", "민주주의", "백두산", "발광", "본진", "불법", "빙하", "삼겹살", "선착장", "쇼핑", "스님", "신부", "신용 카드", 
         "쓸데없다", "안성맞춤", "안전", "앵무새", "양", "얼굴", "엔진", "영어", "외할머니", "유적", "은박지", "인공지능", "인왕산", "자본주의", "접전", "족제비", "주최", "지중해성 기후", "찌개", "찻길", 
         "채식주의자", "첨성대", "체육", "치과", "타인", "태양", "팔월", "팔만대장경", "폐허", "풋과일", "폭탄", "하마", "한라산", "한마음", "핵가족", "대가족", "허영심", "현대인", 
         "현금", "홍익인간", "확률", "홍대입구", "화성", "후금", "훑어보다", "흉흉하다", "힘", "이재명", "대통령"];
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
    if (user.value == word.innerHTML && a > 0 && a < 11) {
        correct++;
    } else if (user.value != word.innerHTML && a > 0 && a < 11) {
        fals++;
        userAnswers.push(user.value);
        correctAnswers.push(word.innerHTML);
    }

    a++;
    if (a > 11) {
        return;
    }
    if (a > 10) {
        const end = performance.now();
        const seconds = (end - start) / 1000;
        var co_rate = correct * 10;
        word.innerHTML = "끝났습니다. 맞은 횟수는 " + correct + "번, 틀린 횟수는 " + fals + "번 입니다. <br>정답율: " + co_rate + "%<br>" + "걸린시간: " + Math.round(seconds) + "초";
        f.innerHTML = "오답: " + userAnswers;
        c.innerHTML = "정답: " + correctAnswers;
        var re = word.innerText;
        localStorage.setItem("최근 기록", re)
        return;
    }
    var randomword = words[Math.floor(Math.random() * words.length)];
    word.innerHTML = randomword;
    user.value = "";
}
document.addEventListener("keydown", function(event) {
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
function showRecent() {
    var sr = localStorage.getItem("최근 기록")
    alert(sr)
}