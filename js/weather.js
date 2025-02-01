// 지역별 좌표 정보
const REGION_COORDS = {
    seoul: { lat: 37.5665, lon: 126.9780, name: '서울특별시' },
    gyeonggi: { lat: 37.2911, lon: 127.0089, name: '경기도' }, // 수원 기준
    gangwon: { lat: 37.8228, lon: 128.1555, name: '강원도' },
    chungbuk: { lat: 36.6372, lon: 127.4913, name: '충청북도' },
    chungnam: { lat: 36.3504, lon: 127.3845, name: '충청남도' },
    jeonbuk: { lat: 35.8161, lon: 127.1089, name: '전라북도' },
    jeonnam: { lat: 34.8679, lon: 126.9910, name: '전라남도' },
    gyeongbuk: { lat: 36.5760, lon: 128.5050, name: '경상북도' },
    gyeongnam: { lat: 35.4606, lon: 128.2132, name: '경상남도' },
    jeju: { lat: 33.4996, lon: 126.5312, name: '제주도' }
};

// 날씨 상태에 따른 이모지와 코멘트
const WEATHER_EMOJI = {
    clear: { 
        emoji: '☀️', 
        status: '맑음',
        comment: '☀️ 맑은 하늘이네요! 야외 활동하기 좋은 날씨예요. 🚶‍♂️' 
    },
    partly_cloudy: {
        emoji: '🌤️',
        status: '구름 조금',
        comment: '🌤️ 구름이 살짝 있지만, 산책하기 좋은 날씨예요. 🌳'
    },
    cloudy: { 
        emoji: '☁️', 
        status: '구름 많음',
        comment: '☁️ 구름이 많네요. 자외선은 적지만 습도 체크하세요. 🌫️' 
    },
    overcast: {
        emoji: '⛅',
        status: '흐림',
        comment: '⛅ 하늘이 흐리네요. 우산을 챙기면 좋을 것 같아요. 🌂'
    },
    rain_light: { 
        emoji: '🌦️', 
        status: '약한 비',
        comment: '🌦️ 가벼운 비가 내려요. 우산 챙기시고 조심히 다니세요! ☔' 
    },
    rain_heavy: {
        emoji: '🌧️',
        status: '강한 비',
        comment: '🌧️ 비가 많이 와요! 우산과 레인부츠가 필요한 날이에요. ⛈️'
    },
    snow_light: { 
        emoji: '🌨️', 
        status: '약한 눈',
        comment: '🌨️ 눈이 포근하게 내려요. 따뜻하게 입고 미끄럼 조심하세요. ⛄' 
    },
    snow_heavy: {
        emoji: '❄️',
        status: '강한 눈',
        comment: '❄️ 눈이 많이 와요! 외출 시 안전에 특히 유의하세요. 🧤'
    },
    thunderstorm: { 
        emoji: '⛈️', 
        status: '천둥번개',
        comment: '⛈️ 천둥번개가 치네요. 가능하면 실내에 계시는 게 좋아요. 🏠' 
    },
    fog: {
        emoji: '🌫️',
        status: '안개',
        comment: '🌫️ 안개가 꼈어요. 운전이나 보행 시 주의하세요. 🚗'
    }
};

// 미세먼지 상태에 따른 이모지와 코멘트
const DUST_EMOJI = {
    good: { 
        emoji: '😊', 
        status: '좋음',
        comment: '😊 공기가 맑아요! 창문 열고 환기하기 좋은 날이에요. 🌱' 
    },
    moderate: { 
        emoji: '😐', 
        status: '보통',
        comment: '😐 미세먼지가 약간 있어요. 민감하신 분들은 마스크 착용을 추천해요. 😷' 
    },
    bad: { 
        emoji: '😷', 
        status: '나쁨',
        comment: '😷 미세먼지가 많아요. 마스크를 꼭 착용하세요. 🏠' 
    },
    very_bad: { 
        emoji: '🤢', 
        status: '매우 나쁨',
        comment: '🤢 미세먼지가 매우 나빠요! 가능한 외출을 자제하세요. ⚠️' 
    }
};

export class WeatherService {
    constructor() {
        this.regionSelect = document.getElementById('regionSelect');
        if (this.regionSelect) {
            this.setupEventListeners();
            // 초기값을 서울로 설정하고 날씨 정보 표시
            this.regionSelect.value = 'seoul';
            this.loadWeatherData('seoul');
        }
    }

    setupEventListeners() {
        this.regionSelect.addEventListener('change', async () => {
            const selectedRegion = this.regionSelect.value;
            if (selectedRegion) {
                await this.loadWeatherData(selectedRegion);
            }
        });
    }

    async loadWeatherData(region) {
        const weatherData = await this.getWeatherData(region);
        if (weatherData) {
            this.updateWeatherUI(weatherData);
        }
    }

    async getWeatherData(region) {
        const coords = REGION_COORDS[region];
        if (!coords) return null;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
        const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coords.lat}&longitude=${coords.lon}&current=pm10,pm2_5`;
        
        try {
            const [weatherResponse, airQualityResponse] = await Promise.all([
                fetch(weatherUrl),
                fetch(airQualityUrl)
            ]);
            
            const weatherData = await weatherResponse.json();
            const airQualityData = await airQualityResponse.json();
            
            return {
                current: weatherData.current,
                daily: weatherData.daily,
                airQuality: airQualityData.current
            };
        } catch (error) {
            console.error('날씨 정보를 가져오는데 실패했습니다:', error);
            return null;
        }
    }

    updateWeatherUI(data) {
        if (!data) return;

        // 기본 날씨 정보 업데이트
        document.getElementById('currentTemp').textContent = Math.round(data.current.temperature_2m);
        document.getElementById('maxTemp').textContent = Math.round(data.daily.temperature_2m_max[0]);
        document.getElementById('minTemp').textContent = Math.round(data.daily.temperature_2m_min[0]);
        document.getElementById('humidity').textContent = Math.round(data.current.relative_humidity_2m);
        document.getElementById('windSpeed').textContent = data.current.wind_speed_10m.toFixed(1);
        
        // 대기질 정보 업데이트
        document.getElementById('pm10').textContent = `${Math.round(data.airQuality.pm10)} μg/m³`;
        document.getElementById('pm25').textContent = `${Math.round(data.airQuality.pm2_5)} μg/m³`;
        
        // 날씨 설명 및 아이콘 업데이트
        const weatherCode = data.current.weather_code;
        document.getElementById('weatherDescription').textContent = this.getWeatherDescription(weatherCode);
        document.getElementById('weatherIcon').src = this.getWeatherIconUrl(weatherCode);
        
        // 날씨 코멘트 업데이트
        document.getElementById('weatherComment').textContent = this.getWeatherComment(
            data.current.temperature_2m,
            data.current.relative_humidity_2m,
            data.airQuality.pm10,
            data.current.wind_speed_10m
        );
    }

    getWeatherIconUrl(code) {
        // WMO Weather interpretation codes: https://open-meteo.com/en/docs
        if (code === 0) return 'https://openweathermap.org/img/wn/01d@2x.png'; // 맑음
        if (code === 1) return 'https://openweathermap.org/img/wn/02d@2x.png'; // 대체로 맑음
        if (code === 2) return 'https://openweathermap.org/img/wn/03d@2x.png'; // 약간 흐림
        if (code === 3) return 'https://openweathermap.org/img/wn/04d@2x.png'; // 흐림
        if ([45, 48].includes(code)) return 'https://openweathermap.org/img/wn/50d@2x.png'; // 안개
        if ([51, 53, 55].includes(code)) return 'https://openweathermap.org/img/wn/09d@2x.png'; // 이슬비
        if ([61, 63, 65].includes(code)) return 'https://openweathermap.org/img/wn/10d@2x.png'; // 비
        if ([71, 73, 75].includes(code)) return 'https://openweathermap.org/img/wn/13d@2x.png'; // 눈
        if ([95, 96, 99].includes(code)) return 'https://openweathermap.org/img/wn/11d@2x.png'; // 천둥번개
        return 'https://openweathermap.org/img/wn/01d@2x.png'; // 기본값
    }

    getWeatherDescription(code) {
        const weatherCodes = {
            0: '맑음',
            1: '대체로 맑음',
            2: '약간 흐림',
            3: '흐림',
            45: '안개',
            48: '진한 안개',
            51: '가벼운 이슬비',
            53: '이슬비',
            55: '진한 이슬비',
            61: '약한 비',
            63: '비',
            65: '강한 비',
            71: '약한 눈',
            73: '눈',
            75: '강한 눈',
            95: '천둥번개'
        };
        return weatherCodes[code] || '알 수 없음';
    }

    getWeatherComment(temp, humidity, pm10, windSpeed) {
        let comment = '';
        
        // 온도 기반 코멘트
        if (temp <= 0) {
            comment = '꽁꽁 얼어붙는 날씨예요! 따뜻하게 입고 나가세요 🧊';
        } else if (temp <= 10) {
            comment = '쌀쌀한 날씨네요! 겉옷을 챙기세요 🧥';
        } else if (temp <= 20) {
            comment = '날씨가 참 좋네요! 산책하기 딱이에요 🌸';
        } else if (temp <= 27) {
            comment = '따뜻한 날씨예요! 물 자주 드세요 💧';
        } else {
            comment = '더운 날씨에요! 시원하게 지내세요 🌡️';
        }

        // 습도 관련 코멘트 추가
        if (humidity > 70) {
            comment += '\n습도가 높아요! 불쾌지수 조심! 💦';
        }

        // 바람 세기 관련 코멘트
        if (windSpeed > 10) {
            comment += '\n바람이 많이 불어요! 날림 주의! 🌪️';
        }

        // 미세먼지 상태 코멘트
        if (pm10 <= 30) {
            comment += '\n공기가 맑아요! 😊';
        } else if (pm10 <= 80) {
            comment += '\n미세먼지가 약간 있어요 😷';
        } else {
            comment += '\n미세먼지가 많아요! 마스크 필수! 😷';
        }

        return comment;
    }
}

// WeatherService 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    new WeatherService();
}); 