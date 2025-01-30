export function initTextEncryption() {
    const encryptInput = document.getElementById('encryptInput');
    const encryptBtn = document.getElementById('encryptBtn');
    const encryptedText = document.getElementById('encryptedText');
    const decryptionKey = document.getElementById('decryptionKey');
    const decryptInput = document.getElementById('decryptInput');
    const keyInput = document.getElementById('keyInput');
    const decryptBtn = document.getElementById('decryptBtn');
    const decryptedText = document.getElementById('decryptedText');
    
    // 복사 버튼들 초기화
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            const targetElement = document.getElementById(targetId);
            targetElement.select();
            document.execCommand('copy');
            
            // 복사 완료 표시
            const originalText = btn.textContent;
            btn.textContent = '복사됨!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 1000);
        });
    });

    // 암호화 함수
    async function encrypt(text) {
        const key = await generateKey();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedText = new TextEncoder().encode(text);
        
        const encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv
            },
            key,
            encodedText
        );
        
        // 암호화된 데이터와 IV를 Base64로 인코딩
        const encryptedArray = new Uint8Array(encryptedData);
        const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
        combinedArray.set(iv);
        combinedArray.set(encryptedArray, iv.length);
        
        return {
            encryptedText: btoa(String.fromCharCode(...combinedArray)),
            key: await exportKey(key)
        };
    }

    // 복호화 함수
    async function decrypt(encryptedText, keyString) {
        try {
            // Base64 디코딩
            const combinedArray = new Uint8Array(
                atob(encryptedText).split('').map(char => char.charCodeAt(0))
            );
            
            // IV와 암호화된 데이터 분리
            const iv = combinedArray.slice(0, 12);
            const encryptedData = combinedArray.slice(12);
            
            // 키 가져오기
            const key = await importKey(keyString);
            
            // 복호화
            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: "AES-GCM",
                    iv: iv
                },
                key,
                encryptedData
            );
            
            return new TextDecoder().decode(decryptedData);
        } catch (error) {
            throw new Error('복호화 실패: 잘못된 키 또는 텍스트입니다.');
        }
    }

    // 키 생성
    async function generateKey() {
        return await crypto.subtle.generateKey(
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    // 키 내보내기
    async function exportKey(key) {
        const exported = await crypto.subtle.exportKey("raw", key);
        return btoa(String.fromCharCode(...new Uint8Array(exported)));
    }

    // 키 가져오기
    async function importKey(keyString) {
        const keyData = new Uint8Array(
            atob(keyString).split('').map(char => char.charCodeAt(0))
        );
        
        return await crypto.subtle.importKey(
            "raw",
            keyData,
            {
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );
    }

    // 이벤트 리스너
    encryptBtn.addEventListener('click', async () => {
        try {
            const text = encryptInput.value;
            if (!text) {
                alert('암호화할 텍스트를 입력하세요.');
                return;
            }

            const result = await encrypt(text);
            encryptedText.value = result.encryptedText;
            decryptionKey.value = result.key;
        } catch (error) {
            alert('암호화 중 오류가 발생했습니다.');
            console.error(error);
        }
    });

    decryptBtn.addEventListener('click', async () => {
        try {
            const text = decryptInput.value;
            const key = keyInput.value;
            
            if (!text || !key) {
                alert('암호화된 텍스트와 키를 모두 입력하세요.');
                return;
            }

            const decrypted = await decrypt(text, key);
            decryptedText.value = decrypted;
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
} 