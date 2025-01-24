export function initBusinessCard() {
    const cardTemplate = document.getElementById('cardTemplate');
    const cardPreview = document.getElementById('cardPreview');
    const saveImageBtn = document.getElementById('saveAsImage');
    const savePdfBtn = document.getElementById('saveAsPdf');
    const copyHtmlBtn = document.getElementById('copyHtml');

    // 모든 입력 필드 가져오기
    const inputs = {
        name: document.getElementById('name'),
        position: document.getElementById('position'),
        company: document.getElementById('company'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        address: document.getElementById('address'),
        website: document.getElementById('website'),
        primaryColor: document.getElementById('primaryColor'),
        textColor: document.getElementById('textColor'),
        fax: document.getElementById('fax')
    };

    // 템플릿 스타일 정의
    const templates = {
        modern: {
            html: (data) => `
                <table style="padding: 20px 30px; border-radius: 3px; border: 2px solid ${data.primaryColor}; font-family: 나눔고딕, nanumgothic, sans-serif; background: ${data.primaryColor} !important; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 13pt;">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.textColor}; font-size: 10px;">${data.position || '부서 / 직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.textColor}; font-size: 13pt; display: block;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-width: 2px 0px 0px; border-style: solid none none; border-color: rgba(255,255,255,0.3); line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px; color: ${data.textColor};">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.textColor};">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.textColor};">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        classic: {
            html: (data) => `
                <table style="padding: 20px 30px; border-radius: 3px; border: 2px solid #000000; font-family: 나눔고딕, nanumgothic, sans-serif; background: #ffffff !important; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 13pt;">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.textColor}; font-size: 10px;">${data.position || '직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.primaryColor}; font-size: 13pt; display: block;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 2px solid ${data.primaryColor}; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px;">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        creative: {
            html: (data) => `
                <table style="padding: 20px 30px; border-radius: 8px; border: none; font-family: 나눔고딕, nanumgothic, sans-serif; background: linear-gradient(135deg, ${data.primaryColor}, #ffffff) !important; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 15pt; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.textColor}; font-size: 11px; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${data.position || '직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.textColor}; font-size: 14pt; display: block; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 2px solid rgba(255,255,255,0.5); line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px;">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        minimal: {
            html: (data) => `
                <table style="padding: 20px 30px; border: none; font-family: 나눔고딕, nanumgothic, sans-serif; background: #ffffff !important; width: 100%; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px; border-left: 3px solid ${data.primaryColor}; padding-left: 15px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 13pt;">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.primaryColor}; font-size: 10px;">${data.position || '직책'}</span>
                                </p>
                                <p><strong>
                                    <span style="color: ${data.textColor}; font-size: 11pt;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 0px; line-height: 20px; padding-left: 18px;">
                                <ul style="margin: 10px 0 0 0; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li><strong style="color: ${data.primaryColor};">Tel</strong> ${data.phone || '전화번호'}</li>
                                    <li><strong style="color: ${data.primaryColor};">Fax</strong> ${data.fax || '팩스번호'}</li>
                                    <li><strong style="color: ${data.primaryColor};">e-mail</strong> ${data.email || '이메일'}</li>
                                    <li style="margin-top: 5px;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        gradient: {
            html: (data) => `
                <table style="padding: 20px 30px; border-radius: 8px; border: none; font-family: 나눔고딕, nanumgothic, sans-serif; background: linear-gradient(45deg, ${data.primaryColor}, #ffffff) !important; width: 100%; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 15pt; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.textColor}; font-size: 11px;">${data.position || '부서 / 직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.textColor}; font-size: 14pt; display: block;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 2px solid rgba(255,255,255,0.5); line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px;">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px;">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        dark: {
            html: (data) => `
                <table style="padding: 20px 30px; border-radius: 5px; border: 1px solid #333; font-family: 나눔고딕, nanumgothic, sans-serif; background: #222 !important; width: 100%; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px; border-left: 3px solid ${data.primaryColor}; padding-left: 15px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: #ffffff; font-size: 13pt;">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.primaryColor}; font-size: 10px;">${data.position || '부서 / 직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.primaryColor}; font-size: 13pt; display: block;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 1px solid #444; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: #ffffff; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: #999; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        simple: {
            html: (data) => `
                <table style="padding: 20px 30px; border: none; font-family: 나눔고딕, nanumgothic, sans-serif; background: #ffffff !important; width: 100%; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p style="margin: 0; border-bottom: 2px solid ${data.primaryColor}; display: inline-block; padding-bottom: 5px;">
                                    <strong style="line-height: 20px; color: ${data.textColor}; font-size: 13pt;">${data.name || '이름'}</strong>
                                    <span style="color: ${data.primaryColor}; font-size: 10px; margin-left: 10px;">${data.position || '부서 / 직책'}</span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 0px; padding-top: 10px;">
                                <p style="margin: 0;">
                                    <strong style="color: ${data.textColor}; font-size: 11pt;">${data.company || '회사명'}</strong>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td style="border: 0px; padding-top: 15px;">
                                <p style="margin: 0; color: ${data.textColor};">
                                    <strong style="color: ${data.primaryColor};">Tel</strong> ${data.phone || '전화번호'} &nbsp;|&nbsp;
                                    <strong style="color: ${data.primaryColor};">Fax</strong> ${data.fax || '팩스번호'} &nbsp;|&nbsp;
                                    <strong style="color: ${data.primaryColor};">e-mail</strong> ${data.email || '이메일'}
                                </p>
                                <p style="margin: 5px 0 0 0; color: ${data.textColor};">${data.address || '주소'}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        border: {
            html: (data) => `
                <table style="padding: 20px 30px; border: 2px solid ${data.primaryColor}; font-family: 나눔고딕, nanumgothic, sans-serif; background: #ffffff !important; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="border: 0px; height: 35px;">
                                <p><strong style="line-height: 20px;">
                                    <span style="color: ${data.textColor}; font-size: 13pt;">${data.name || '이름'}</span></strong>
                                    <span style="color: ${data.primaryColor}; font-size: 10px;">${data.position || '부서 / 직책'}</span>
                                </p>
                            </td>
                            <td style="border: 0px;">
                                <p><strong>
                                    <span style="text-align: right; color: ${data.primaryColor}; font-size: 13pt; display: block;">${data.company || '회사명'}</span>
                                </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-top: 1px solid ${data.primaryColor}; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">Tel</strong>${data.phone || '전화번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">Fax</strong>${data.fax || '팩스번호'}</li>
                                    <li style="float: left; margin-left: 15px;"><strong style="margin: 0px 3px 0px 1px; color: ${data.primaryColor};">e-mail</strong>${data.email || '이메일'}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 0px; line-height: 20px;">
                                <ul style="margin: 0px; padding: 0px; color: ${data.textColor}; list-style-type: none;">
                                    <li style="float: left;">${data.address || '주소'}</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `
        }
    };

    // 입력값 변경 시 실시간 업데이트를 위한 함수
    function updateCard() {
        console.log('updateCard called'); // 디버깅용
        const data = {
            name: inputs.name.value,
            position: inputs.position.value,
            company: inputs.company.value,
            phone: inputs.phone.value,
            email: inputs.email.value,
            address: inputs.address.value,
            website: inputs.website.value,
            fax: inputs.fax.value,
            primaryColor: inputs.primaryColor.value,
            textColor: inputs.textColor.value
        };
        
        console.log('Current data:', data); // 디버깅용
        
        const template = templates[cardTemplate.value];
        if (template) {
            cardPreview.innerHTML = template.html(data);
        } else {
            console.error('Selected template not found:', cardTemplate.value);
        }
    }

    // 이미지로 저장
    async function saveAsImage() {
        try {
            const element = cardPreview.firstElementChild;
            const canvas = await html2canvas(element);
            const link = document.createElement('a');
            link.download = '명함.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('이미지 저장 오류:', error);
            alert('이미지 저장 중 오류가 발생했습니다.');
        }
    }

    // PDF로 저장
    async function saveAsPdf() {
        try {
            const element = cardPreview.firstElementChild;
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');

            const { jsPDF } = await import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'A4'
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);
            pdf.save('명함.pdf');
        } catch (error) {
            console.error('PDF 저장 오류:', error);
            alert('PDF 저장 중 오류가 발생했습니다.');
        }
    }

    // HTML 복사 함수 추가
    async function copyHtml() {
        try {
            const htmlContent = cardPreview.innerHTML;
            await navigator.clipboard.writeText(htmlContent);
            
            // 복사 성공 표시
            const originalText = copyHtmlBtn.textContent;
            copyHtmlBtn.textContent = '복사 완료!';
            setTimeout(() => {
                copyHtmlBtn.textContent = originalText;
            }, 2000);
        } catch (error) {
            console.error('HTML 복사 오류:', error);
            alert('HTML 복사 중 오류가 발생했습니다.');
        }
    }

    // 이벤트 리스너 등록
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        if (input) {
            input.addEventListener('input', updateCard);
            input.addEventListener('change', updateCard);
        } else {
            console.error(`Input field not found: ${key}`);
        }
    });

    // 템플릿 변경 이벤트
    cardTemplate.addEventListener('change', updateCard);

    // 버튼 이벤트 리스너
    saveImageBtn.addEventListener('click', saveAsImage);
    savePdfBtn.addEventListener('click', saveAsPdf);
    copyHtmlBtn.addEventListener('click', copyHtml);

    // 초기 카드 생성
    updateCard();
} 