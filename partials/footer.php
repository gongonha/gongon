<!-- partials/footer.php -->
<footer>
  <p>&copy; 2025. 마타리 크리에이티브</p>
</footer>

<!-- 메인 스크립트 -->
<script type="module" src="js/main.js"></script>

<!-- Firebase 방문자 카운터 -->
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, increment } 
  from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase 설정
const firebaseConfig = {
  databaseURL: "https://matari-f6260-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function getKoreanToday() {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  return now.toISOString().split('T')[0];
}

async function updateVisitorCount() {
  const today = getKoreanToday();
  const lastVisit = localStorage.getItem('lastVisit');
  const currentTime = new Date().getTime();

  if (lastVisit) {
    const timeDiff = currentTime - parseInt(lastVisit);
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff < 24) {
      displayVisitorCount();
      return;
    }
  }

  const todayRef = ref(db, `visitors/${today}`);
  const totalRef = ref(db, 'visitors/total');

  try {
    await set(todayRef, increment(1));
    await set(totalRef, increment(1));
    localStorage.setItem('lastVisit', currentTime.toString());
    displayVisitorCount();
  } catch (error) {
    console.error('방문자 수 업데이트 실패:', error);
    await displayVisitorCount();
  }
}

async function displayVisitorCount() {
  const today = getKoreanToday();
  const todayRef = ref(db, `visitors/${today}`);
  const totalRef = ref(db, 'visitors/total');

  try {
    const todaySnapshot = await get(todayRef);
    const totalSnapshot = await get(totalRef);

    document.getElementById('todayVisitors').textContent =
      todaySnapshot.exists() ? todaySnapshot.val() : 0;
    document.getElementById('totalVisitors').textContent =
      totalSnapshot.exists() ? totalSnapshot.val() : 0;
  } catch (error) {
    console.error('방문자 수 조회 실패:', error);
  }
}

// 페이지 로드 시
updateVisitorCount();
</script>

<script src="js/board.js"></script>

</body>
</html>
