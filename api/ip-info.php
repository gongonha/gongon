<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function getClientIP() {
    $ipAddress = '';
    
    // CloudFlare의 실제 방문자 IP
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
        $ipAddress = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    // 프록시를 통한 접속인 경우
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    // 일반적인 경우
    else if (isset($_SERVER['REMOTE_ADDR'])) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    
    return $ipAddress;
}

function getLocalIP() {
    $localIP = '';
    
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // Windows
        $cmd = "ipconfig";
        exec($cmd, $output);
        foreach($output as $line) {
            if (strpos($line, 'IPv4 Address') !== false) {
                $localIP = trim(substr($line, strpos($line, ': ') + 2));
                break;
            }
        }
    } else {
        // Linux/Unix
        $cmd = "hostname -I";
        exec($cmd, $output);
        if (!empty($output)) {
            $localIP = trim($output[0]);
        }
    }
    
    return $localIP ?: '확인 불가';
}

function getIpInfo() {
    $clientIP = getClientIP();
    $localIP = getLocalIP();
    
    // localhost 테스트 환경인 경우
    if ($clientIP === '127.0.0.1' || $clientIP === '::1') {
        return json_encode([
            'ip' => $clientIP,
            'private_ip' => $localIP,
            'country_name' => '대한민국',
            'region' => '서울특별시',
            'city' => '서울',
            'org' => 'Local Development',
            'latitude' => 37.5665,
            'longitude' => 126.9780,
            'timezone' => 'Asia/Seoul'
        ]);
    }

    // 실제 환경에서는 API 호출
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://ipapi.co/json/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $data = json_decode($response, true);
        if ($data && isset($data['ip'])) {
            $data['private_ip'] = $localIP;  // 사설 IP 추가
            return json_encode($data);
        }
    }
    
    return json_encode(['error' => 'IP 정보를 가져오는데 실패했습니다.']);
}

try {
    echo getIpInfo();
} catch (Exception $e) {
    echo json_encode([
        'error' => '서버 오류: ' . $e->getMessage()
    ]);
} 