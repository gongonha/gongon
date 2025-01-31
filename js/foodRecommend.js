const foodData = {
    breakfast: {
        korean: [
            { name: "북엇국", spicy: false, soup: true },
            { name: "된장국", spicy: false, soup: true },
            { name: "콩나물국밥", spicy: false, soup: true },
            { name: "순두부찌개", spicy: true, soup: true },
            { name: "떡국", spicy: false, soup: true },
            { name: "미역국", spicy: false, soup: true },
            { name: "김치찌개", spicy: true, soup: true },
            { name: "계란말이", spicy: false, soup: false },
            { name: "시래기국", spicy: false, soup: true },
            { name: "황태해장국", spicy: false, soup: true },
            { name: "어묵국", spicy: false, soup: true },
            { name: "소고기무국", spicy: false, soup: true },
            { name: "달걀죽", spicy: false, soup: true },
            { name: "전복죽", spicy: false, soup: true },
            { name: "호박죽", spicy: false, soup: true },
            { name: "야채죽", spicy: false, soup: true },
            { name: "김치볶음밥", spicy: true, soup: false },
            { name: "누룽지", spicy: false, soup: false },
            { name: "소고기죽", spicy: false, soup: true },
            { name: "팥죽", spicy: false, soup: true },
            { name: "닭죽", spicy: false, soup: true },
            { name: "새우죽", spicy: false, soup: true },
            { name: "버섯죽", spicy: false, soup: true },
            { name: "굴죽", spicy: false, soup: true },
            { name: "참치김치볶음밥", spicy: true, soup: false },
            { name: "멸치국수", spicy: false, soup: true },
            { name: "북어국", spicy: false, soup: true },
            { name: "콩국수", spicy: false, soup: true },
            { name: "오징어국", spicy: false, soup: true },
            { name: "계란국", spicy: false, soup: true },
            { name: "두부조림", spicy: false, soup: false },
            { name: "감자조림", spicy: false, soup: false },
            { name: "메추리알장조림", spicy: false, soup: false },
            { name: "어묵볶음", spicy: false, soup: false },
            { name: "김치콩나물국", spicy: true, soup: true },
            { name: "무채국", spicy: false, soup: true }
        ],
        western: [
            { name: "샌드위치", spicy: false, soup: false },
            { name: "프렌치토스트", spicy: false, soup: false },
            { name: "스크램블에그", spicy: false, soup: false },
            { name: "팬케이크", spicy: false, soup: false },
            { name: "오믈렛", spicy: false, soup: false },
            { name: "시리얼", spicy: false, soup: false },
            { name: "베이글", spicy: false, soup: false },
            { name: "토스트", spicy: false, soup: false },
            { name: "크로와상", spicy: false, soup: false },
            { name: "머핀", spicy: false, soup: false },
            { name: "와플", spicy: false, soup: false },
            { name: "그래놀라", spicy: false, soup: false },
            { name: "요거트볼", spicy: false, soup: false },
            { name: "에그베네딕트", spicy: false, soup: false },
            { name: "콘푸라이", spicy: false, soup: false },
            { name: "잉글리시브렉퍼스트", spicy: false, soup: false },
            { name: "아보카도토스트", spicy: false, soup: false },
            { name: "치즈오믈렛", spicy: false, soup: false },
            { name: "베이컨에그", spicy: false, soup: false },
            { name: "과일샐러드", spicy: false, soup: false },
            { name: "그릭요거트", spicy: false, soup: false },
            { name: "블루베리팬케이크", spicy: false, soup: false },
            { name: "바나나팬케이크", spicy: false, soup: false },
            { name: "치즈베이글", spicy: false, soup: false },
            { name: "연어베이글", spicy: false, soup: false },
            { name: "과일와플", spicy: false, soup: false },
            { name: "초코와플", spicy: false, soup: false },
            { name: "콘치즈토스트", spicy: false, soup: false },
            { name: "햄치즈크로와상", spicy: false, soup: false },
            { name: "브리오쉬", spicy: false, soup: false }
        ],
        fusion: [
            { name: "토스트 & 된장국", spicy: false, soup: true },
            { name: "샌드위치 & 미역국", spicy: false, soup: true },
            { name: "크로와상 & 우유", spicy: false, soup: false },
            { name: "베이글 & 스프", spicy: false, soup: true },
            { name: "팬케이크 & 된장국", spicy: false, soup: true },
            { name: "와플 & 미역국", spicy: false, soup: true },
            { name: "크로와상 & 북엇국", spicy: false, soup: true },
            { name: "머핀 & 콩나물국", spicy: false, soup: true },
            { name: "치즈토스트 & 어묵국", spicy: false, soup: true },
            { name: "베이글 & 황태해장국", spicy: false, soup: true },
            { name: "팬케이크 & 우유", spicy: false, soup: false },
            { name: "시리얼 & 요구르트", spicy: false, soup: false },
            { name: "토스트 & 과일", spicy: false, soup: false }
        ]
    },
    lunch: {
        korean: [
            { name: "제육볶음", spicy: true, soup: false },
            { name: "된장찌개", spicy: false, soup: true },
            { name: "비빔밥", spicy: true, soup: false },
            { name: "김치찌개", spicy: true, soup: true },
            { name: "순두부찌개", spicy: true, soup: true },
            { name: "부대찌개", spicy: true, soup: true },
            { name: "돼지국밥", spicy: false, soup: true },
            { name: "칼국수", spicy: false, soup: true },
            { name: "냉면", spicy: false, soup: true },
            { name: "떡볶이", spicy: true, soup: false },
            { name: "닭볶음탕", spicy: true, soup: true },
            { name: "갈비탕", spicy: false, soup: true },
            { name: "육개장", spicy: true, soup: true },
            { name: "설렁탕", spicy: false, soup: true },
            { name: "순대국", spicy: false, soup: true },
            { name: "해물파전", spicy: false, soup: false },
            { name: "김치전", spicy: true, soup: false },
            { name: "동태찌개", spicy: true, soup: true },
            { name: "청국장", spicy: false, soup: true },
            { name: "콩나물불고기", spicy: false, soup: false },
            { name: "낙지볶음", spicy: true, soup: false },
            { name: "쭈꾸미볶음", spicy: true, soup: false },
            { name: "오징어볶음", spicy: true, soup: false },
            { name: "꽃게탕", spicy: false, soup: true },
            { name: "알탕", spicy: true, soup: true },
            { name: "전복죽", spicy: false, soup: true },
            { name: "장어덮밥", spicy: false, soup: false },
            { name: "낙지덮밥", spicy: true, soup: false },
            { name: "제육덮밥", spicy: true, soup: false },
            { name: "오징어덮밥", spicy: true, soup: false },
            { name: "돈까스덮밥", spicy: false, soup: false },
            { name: "김치볶음밥", spicy: true, soup: false },
            { name: "새우볶음밥", spicy: false, soup: false },
            { name: "소고기볶음밥", spicy: false, soup: false },
            { name: "잡채밥", spicy: false, soup: false },
            { name: "물냉면", spicy: false, soup: true },
            { name: "비빔냉면", spicy: true, soup: false },
            { name: "쫄면", spicy: true, soup: false },
            { name: "족발", spicy: false, soup: false },
            { name: "보쌈", spicy: false, soup: false },
            { name: "냉채족발", spicy: false, soup: false },
            { name: "마늘족발", spicy: false, soup: false },
            { name: "불족발", spicy: true, soup: false },
            { name: "닭발", spicy: true, soup: false },
            { name: "불닭발", spicy: true, soup: false },
            { name: "닭갈비", spicy: true, soup: false },
            { name: "양념치킨", spicy: true, soup: false },
            { name: "후라이드치킨", spicy: false, soup: false },
            { name: "간장치킨", spicy: false, soup: false },
            { name: "마늘치킨", spicy: false, soup: false },
            { name: "순살치킨", spicy: false, soup: false },
            { name: "찜닭", spicy: true, soup: true },
            { name: "안동찜닭", spicy: true, soup: true },
            { name: "묵은지찜", spicy: true, soup: true },
            { name: "아구찜", spicy: true, soup: true },
            { name: "코다리찜", spicy: true, soup: true },
            { name: "갈치조림", spicy: true, soup: false },
            { name: "고등어조림", spicy: true, soup: false },
            { name: "꽃게찜", spicy: true, soup: true },
            { name: "대하구이", spicy: false, soup: false },
            { name: "조개구이", spicy: false, soup: false },
            { name: "전복구이", spicy: false, soup: false },
            { name: "한우육회", spicy: false, soup: false },
            { name: "육회비빔밥", spicy: true, soup: false },
            { name: "회덮밥", spicy: false, soup: false },
            { name: "물회", spicy: false, soup: true },
            { name: "홍어회", spicy: true, soup: false },
            { name: "광어회", spicy: false, soup: false },
            { name: "연어회", spicy: false, soup: false }
        ],
        chinese: [
            { name: "짜장면", spicy: false, soup: false },
            { name: "짬뽕", spicy: true, soup: true },
            { name: "마라탕", spicy: true, soup: true },
            { name: "탕수육", spicy: false, soup: false },
            { name: "마파두부", spicy: true, soup: false },
            { name: "양장피", spicy: false, soup: false },
            { name: "깐풍기", spicy: false, soup: false },
            { name: "유산슬", spicy: false, soup: false },
            { name: "고추잡채", spicy: true, soup: false },
            { name: "팔보채", spicy: false, soup: false },
            { name: "양꼬치", spicy: false, soup: false },
            { name: "마라샹궈", spicy: true, soup: false },
            { name: "꿔바로우", spicy: false, soup: false },
            { name: "동파육", spicy: false, soup: false },
            { name: "울면", spicy: false, soup: true },
            { name: "북경오리", spicy: false, soup: false },
            { name: "양고기훠궈", spicy: true, soup: true },
            { name: "마라우육면", spicy: true, soup: true },
            { name: "어향육슬", spicy: false, soup: false },
            { name: "칠리새우", spicy: true, soup: false },
            { name: "삼선짜장면", spicy: false, soup: false },
            { name: "삼선짬뽕", spicy: true, soup: true },
            { name: "해물짬뽕", spicy: true, soup: true },
            { name: "차돌짬뽕", spicy: true, soup: true },
            { name: "새우볶음밥", spicy: false, soup: false },
            { name: "삼선볶음밥", spicy: false, soup: false },
            { name: "마파두부밥", spicy: true, soup: false },
            { name: "난자완스", spicy: false, soup: false },
            { name: "라조기", spicy: true, soup: false },
            { name: "깐쇼새우", spicy: true, soup: false },
            { name: "유린기", spicy: false, soup: false },
            { name: "고추잡채밥", spicy: true, soup: false },
            { name: "기스면", spicy: false, soup: true },
            { name: "삼선우동", spicy: false, soup: true },
            { name: "마라룽샤", spicy: true, soup: false },
            { name: "마라양꼬치", spicy: true, soup: false },
            { name: "마라훠궈", spicy: true, soup: true },
            { name: "사천탕면", spicy: true, soup: true },
            { name: "깐풍만두", spicy: false, soup: false },
            { name: "군만두", spicy: false, soup: false },
            { name: "딤섬", spicy: false, soup: false }
        ],
        japanese: [
            { name: "라멘", spicy: false, soup: true },
            { name: "우동", spicy: false, soup: true },
            { name: "돈카츠", spicy: false, soup: false },
            { name: "초밥", spicy: false, soup: false },
            { name: "규동", spicy: false, soup: false },
            { name: "가츠동", spicy: false, soup: false },
            { name: "오니기리", spicy: false, soup: false },
            { name: "소바", spicy: false, soup: true },
            { name: "텐동", spicy: false, soup: false },
            { name: "오야코동", spicy: false, soup: false },
            { name: "규카츠", spicy: false, soup: false },
            { name: "카레라이스", spicy: false, soup: false },
            { name: "나베우동", spicy: false, soup: true },
            { name: "히레카츠", spicy: false, soup: false },
            { name: "사케동", spicy: false, soup: false },
            { name: "오마카세", spicy: false, soup: false },
            { name: "모츠나베", spicy: false, soup: true },
            { name: "스끼다시", spicy: false, soup: false },
            { name: "타타키", spicy: false, soup: false },
            { name: "회덮밥", spicy: false, soup: false },
            { name: "미소라멘", spicy: false, soup: true },
            { name: "돈코츠라멘", spicy: false, soup: true },
            { name: "카레우동", spicy: false, soup: true },
            { name: "냉우동", spicy: false, soup: true },
            { name: "튀김우동", spicy: false, soup: true },
            { name: "해물우동", spicy: false, soup: true },
            { name: "나가사키짬뽕", spicy: true, soup: true },
            { name: "규니쿠덮밥", spicy: false, soup: false },
            { name: "치킨가라아게", spicy: false, soup: false },
            { name: "연어덮밥", spicy: false, soup: false },
            { name: "메밀소바", spicy: false, soup: true },
            { name: "냉소바", spicy: false, soup: true },
            { name: "돈부리", spicy: false, soup: false },
            { name: "야끼소바", spicy: false, soup: false },
            { name: "오코노미야키", spicy: false, soup: false },
            { name: "규카츠", spicy: false, soup: false },
            { name: "사시미", spicy: false, soup: false },
            { name: "스키야키", spicy: false, soup: true },
            { name: "야키니쿠", spicy: false, soup: false },
            { name: "이자카야세트", spicy: false, soup: false },
            { name: "우나기동", spicy: false, soup: false },
            { name: "가이센동", spicy: false, soup: false },
            { name: "텐동", spicy: false, soup: false },
            { name: "규카츠", spicy: false, soup: false },
            { name: "사시미", spicy: false, soup: false },
            { name: "히레카츠", spicy: false, soup: false },
            { name: "스키야키", spicy: false, soup: true },
            { name: "야키니쿠", spicy: false, soup: false },
            { name: "이자카야세트", spicy: false, soup: false },
            { name: "돈카츠카레", spicy: false, soup: false },
            { name: "차슈라멘", spicy: false, soup: true },
            { name: "규동", spicy: false, soup: false },
            { name: "붓카케우동", spicy: false, soup: true },
            { name: "타코야키", spicy: false, soup: false },
            { name: "야키소바", spicy: false, soup: false },
            { name: "규니쿠덮밥", spicy: false, soup: false },
            { name: "모듬사시미", spicy: false, soup: false },
            { name: "방어회", spicy: false, soup: false },
            { name: "참치회", spicy: false, soup: false }
        ],
        western: [
            { name: "파스타", spicy: false, soup: false },
            { name: "피자", spicy: false, soup: false },
            { name: "햄버거", spicy: false, soup: false },
            { name: "스테이크", spicy: false, soup: false },
            { name: "샐러드", spicy: false, soup: false },
            { name: "리조또", spicy: false, soup: false },
            { name: "크림파스타", spicy: false, soup: false },
            { name: "오일파스타", spicy: false, soup: false },
            { name: "로제파스타", spicy: false, soup: false },
            { name: "치킨버거", spicy: false, soup: false },
            { name: "클럽샌드위치", spicy: false, soup: false },
            { name: "시저샐러드", spicy: false, soup: false },
            { name: "콥샐러드", spicy: false, soup: false },
            { name: "감자스프", spicy: false, soup: true },
            { name: "버섯스프", spicy: false, soup: true },
            { name: "바비큐", spicy: false, soup: false },
            { name: "치킨스테이크", spicy: false, soup: false },
            { name: "폭립", spicy: false, soup: false },
            { name: "함박스테이크", spicy: false, soup: false },
            { name: "그릴드치킨", spicy: false, soup: false },
            { name: "비프스튜", spicy: false, soup: true },
            { name: "랍스터", spicy: false, soup: false },
            { name: "알리오올리오", spicy: false, soup: false },
            { name: "까르보나라", spicy: false, soup: false },
            { name: "봉골레파스타", spicy: false, soup: false },
            { name: "아라비아타", spicy: true, soup: false },
            { name: "프루티디마레", spicy: false, soup: false },
            { name: "페페론치노", spicy: true, soup: false },
            { name: "마르게리타피자", spicy: false, soup: false },
            { name: "페퍼로니피자", spicy: false, soup: false },
            { name: "하와이안피자", spicy: false, soup: false },
            { name: "치킨파마산", spicy: false, soup: false },
            { name: "비프스테이크", spicy: false, soup: false },
            { name: "포크스테이크", spicy: false, soup: false },
            { name: "치킨샐러드", spicy: false, soup: false },
            { name: "연어샐러드", spicy: false, soup: false },
            { name: "프렌치어니언스프", spicy: false, soup: true },
            { name: "토마호크스테이크", spicy: false, soup: false },
            { name: "티본스테이크", spicy: false, soup: false },
            { name: "립아이스테이크", spicy: false, soup: false },
            { name: "포터하우스", spicy: false, soup: false },
            { name: "바비큐립", spicy: false, soup: false },
            { name: "로스트치킨", spicy: false, soup: false },
            { name: "비프웰링턴", spicy: false, soup: false },
            { name: "랍스터테르미도르", spicy: false, soup: false },
            { name: "시푸드플래터", spicy: false, soup: false },
            { name: "프렌치랙", spicy: false, soup: false },
            { name: "수제버거", spicy: false, soup: false },
            { name: "치즈버거", spicy: false, soup: false },
            { name: "베이컨버거", spicy: false, soup: false },
            { name: "쉬림프버거", spicy: false, soup: false },
            { name: "치킨버거", spicy: false, soup: false },
            { name: "치킨샌드위치", spicy: false, soup: false },
            { name: "BLT샌드위치", spicy: false, soup: false },
            { name: "미트볼스파게티", spicy: false, soup: false },
            { name: "치킨알프레도", spicy: false, soup: false }
        ]
    },
    dinner: {
        korean: [
            { name: "삼겹살", spicy: false, soup: false },
            { name: "부대찌개", spicy: true, soup: true },
            { name: "닭갈비", spicy: true, soup: false },
            { name: "김치찜", spicy: true, soup: true },
            { name: "갈비찜", spicy: false, soup: true },
            { name: "감자탕", spicy: true, soup: true },
            { name: "삼계탕", spicy: false, soup: true },
            { name: "청국장", spicy: false, soup: true },
            { name: "불고기", spicy: false, soup: false },
            { name: "낙곱새", spicy: true, soup: true },
            { name: "아구찜", spicy: true, soup: true },
            { name: "조개찜", spicy: false, soup: true },
            { name: "대구탕", spicy: false, soup: true },
            { name: "곱창구이", spicy: false, soup: false },
            { name: "돼지갈비", spicy: false, soup: false },
            { name: "소갈비", spicy: false, soup: false },
            { name: "닭도리탕", spicy: true, soup: true },
            { name: "해물찜", spicy: true, soup: true },
            { name: "북경오리", spicy: false, soup: false },
            { name: "양고기훠궈", spicy: true, soup: true },
            { name: "마라우육면", spicy: true, soup: true },
            { name: "어향육슬", spicy: false, soup: false },
            { name: "칠리새우", spicy: true, soup: false },
            { name: "오마카세", spicy: false, soup: false },
            { name: "모츠나베", spicy: false, soup: true },
            { name: "스끼다시", spicy: false, soup: false },
            { name: "타타키", spicy: false, soup: false },
            { name: "회덮밥", spicy: false, soup: false },
            { name: "소고기구이", spicy: false, soup: false },
            { name: "항정살구이", spicy: false, soup: false },
            { name: "목살구이", spicy: false, soup: false },
            { name: "갈매기살구이", spicy: false, soup: false },
            { name: "오리구이", spicy: false, soup: false },
            { name: "오리주물럭", spicy: true, soup: false },
            { name: "양념갈비", spicy: false, soup: false },
            { name: "돼지갈비찜", spicy: false, soup: true },
            { name: "묵은지찜", spicy: true, soup: true },
            { name: "문어숙회", spicy: false, soup: false },
            { name: "산낙지", spicy: false, soup: false },
            { name: "회덮밥", spicy: false, soup: false },
            { name: "물회", spicy: false, soup: true },
            { name: "전복구이", spicy: false, soup: false },
            { name: "왕족발", spicy: false, soup: false },
            { name: "반반족발", spicy: true, soup: false },
            { name: "매운족발", spicy: true, soup: false },
            { name: "냉채족발", spicy: false, soup: false },
            { name: "반반닭발", spicy: true, soup: false },
            { name: "무뼈닭발", spicy: true, soup: false },
            { name: "오돌뼈", spicy: true, soup: false },
            { name: "대창구이", spicy: false, soup: false },
            { name: "막창구이", spicy: false, soup: false },
            { name: "양념막창", spicy: true, soup: false },
            { name: "소주무침", spicy: true, soup: false },
            { name: "계란말이", spicy: false, soup: false },
            { name: "김치전", spicy: true, soup: false },
            { name: "해물파전", spicy: false, soup: false },
            { name: "동태전", spicy: false, soup: false },
            { name: "두부김치", spicy: true, soup: false },
            { name: "골뱅이무침", spicy: true, soup: false },
            { name: "주꾸미볶음", spicy: true, soup: false },
            { name: "낙지볶음", spicy: true, soup: false },
            { name: "소고기무침회", spicy: true, soup: false },
            { name: "육회", spicy: false, soup: false },
            { name: "산낙지", spicy: false, soup: false },
            { name: "전복회", spicy: false, soup: false },
            { name: "문어숙회", spicy: false, soup: false },
            { name: "마라곱창", spicy: true, soup: false },
            { name: "마라우육", spicy: true, soup: false },
            { name: "마라새우", spicy: true, soup: false },
            { name: "마라치킨", spicy: true, soup: false },
            { name: "마라양고기", spicy: true, soup: false },
            { name: "마라소고기", spicy: true, soup: false },
            { name: "마라해물", spicy: true, soup: false }
        ],
        chinese: [
            { name: "꿔바로우", spicy: false, soup: false },
            { name: "양장피", spicy: false, soup: false },
            { name: "마라소고기", spicy: true, soup: false },
            { name: "마라양고기", spicy: true, soup: false },
            { name: "마라해물", spicy: true, soup: false },
            { name: "어향가지", spicy: false, soup: false },
            { name: "깐풍새우", spicy: false, soup: false },
            { name: "유산슬", spicy: false, soup: false },
            { name: "팔보채", spicy: false, soup: false },
            { name: "해삼탕", spicy: false, soup: true },
            { name: "삼선짜장면", spicy: false, soup: false },
            { name: "삼선짬뽕", spicy: true, soup: true },
            { name: "해물짬뽕", spicy: true, soup: true },
            { name: "차돌짬뽕", spicy: true, soup: true },
            { name: "새우볶음밥", spicy: false, soup: false },
            { name: "삼선볶음밥", spicy: false, soup: false },
            { name: "마파두부밥", spicy: true, soup: false },
            { name: "난자완스", spicy: false, soup: false },
            { name: "라조기", spicy: true, soup: false },
            { name: "깐쇼새우", spicy: true, soup: false },
            { name: "고추잡채밥", spicy: true, soup: false },
            { name: "기스면", spicy: false, soup: true },
            { name: "삼선우동", spicy: false, soup: true },
            { name: "마라룽샤", spicy: true, soup: false },
            { name: "양고기훠궈", spicy: true, soup: true },
            { name: "마라곱창", spicy: true, soup: false },
            { name: "마라우육", spicy: true, soup: false },
            { name: "마라새우", spicy: true, soup: false },
            { name: "마라치킨", spicy: true, soup: false },
            { name: "마라양고기", spicy: true, soup: false },
            { name: "마라소고기", spicy: true, soup: false },
            { name: "마라해물", spicy: true, soup: false }
        ],
        japanese: [
            { name: "사케동", spicy: false, soup: false },
            { name: "우나기동", spicy: false, soup: false },
            { name: "가이센동", spicy: false, soup: false },
            { name: "텐동", spicy: false, soup: false },
            { name: "규카츠", spicy: false, soup: false },
            { name: "사시미", spicy: false, soup: false },
            { name: "히레카츠", spicy: false, soup: false },
            { name: "스키야키", spicy: false, soup: true },
            { name: "야키니쿠", spicy: false, soup: false },
            { name: "이자카야세트", spicy: false, soup: false },
            { name: "우나기동", spicy: false, soup: false },
            { name: "가이센동", spicy: false, soup: false },
            { name: "텐동", spicy: false, soup: false },
            { name: "규카츠", spicy: false, soup: false },
            { name: "사시미", spicy: false, soup: false },
            { name: "히레카츠", spicy: false, soup: false },
            { name: "스키야키", spicy: false, soup: true },
            { name: "야키니쿠", spicy: false, soup: false },
            { name: "이자카야세트", spicy: false, soup: false },
            { name: "연어회", spicy: false, soup: false },
            { name: "모듬사시미", spicy: false, soup: false },
            { name: "방어회", spicy: false, soup: false },
            { name: "참치회", spicy: false, soup: false }
        ],
        western: [
            { name: "토마호크스테이크", spicy: false, soup: false },
            { name: "채끝등심스테이크", spicy: false, soup: false },
            { name: "안심스테이크", spicy: false, soup: false },
            { name: "립아이스테이크", spicy: false, soup: false },
            { name: "포터하우스스테이크", spicy: false, soup: false },
            { name: "바비큐폭립", spicy: false, soup: false },
            { name: "바비큐치킨", spicy: false, soup: false },
            { name: "랍스터", spicy: false, soup: false },
            { name: "킹크랩", spicy: false, soup: false },
            { name: "씨푸드플래터", spicy: false, soup: false }
        ]
    }
};

export function initFoodRecommend() {
    const mealBtns = document.querySelectorAll('.meal-btn');
    const foodCategory = document.getElementById('foodCategory');
    const spicyFilter = document.getElementById('spicyFilter');
    const soupFilter = document.getElementById('soupFilter');
    const recommendBtn = document.getElementById('recommendBtn');
    const menuDisplay = document.querySelector('.menu-display');
    const menuList = document.getElementById('menuList');

    let currentMeal = 'breakfast';

    // 식사 시간대 버튼 이벤트
    mealBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mealBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMeal = btn.dataset.meal;
            updateMenuList();
        });
    });

    // 필터 변경 이벤트
    [foodCategory, spicyFilter, soupFilter].forEach(filter => {
        filter.addEventListener('change', updateMenuList);
    });

    // 추천 버튼 클릭 이벤트
    recommendBtn.addEventListener('click', () => {
        const filteredMenus = getFilteredMenus();
        if (filteredMenus.length === 0) {
            menuDisplay.innerHTML = '<p>조건에 맞는 메뉴가 없습니다.</p>';
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredMenus.length);
        const recommendedMenu = filteredMenus[randomIndex];
        
        menuDisplay.innerHTML = `
            <div class="recommended-item">
                <h4>${recommendedMenu.name}</h4>
                <p class="menu-properties">
                    ${recommendedMenu.spicy ? '매운맛 🌶️' : '순한맛 😊'}
                    ${recommendedMenu.soup ? '| 국물요리 🥣' : ''}
                </p>
            </div>
        `;
    });

    function getFilteredMenus() {
        const category = foodCategory.value;
        const noSpicy = spicyFilter.checked;
        const soupOnly = soupFilter.checked;

        let menus = [];
        if (category === 'all') {
            Object.values(foodData[currentMeal]).forEach(categoryMenus => {
                menus = menus.concat(categoryMenus);
            });
        } else {
            menus = foodData[currentMeal][category] || [];
        }

        return menus.filter(menu => {
            if (noSpicy && menu.spicy) return false;
            if (soupOnly && !menu.soup) return false;
            return true;
        });
    }

    function updateMenuList() {
        const filteredMenus = getFilteredMenus();
        menuList.innerHTML = filteredMenus.map(menu => `
            <div class="menu-item">
                <span class="menu-name">${menu.name}</span>
                <span class="menu-properties">
                    ${menu.spicy ? '🌶️' : ''}
                    ${menu.soup ? '🥣' : ''}
                </span>
            </div>
        `).join('');
    }

    // 초기 메뉴 목록 표시
    updateMenuList();
} 