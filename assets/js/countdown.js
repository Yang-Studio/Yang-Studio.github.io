// 倒计时功能
document.addEventListener('DOMContentLoaded', () => {
    // 设置目标日期 - 默认为当前日期后的30天
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    // 获取倒计时元素
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // 更新倒计时函数
    function updateCountdown() {
        const currentDate = new Date();
        const difference = targetDate - currentDate;
        
        // 计算天、时、分、秒
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // 更新DOM元素
        daysElement.textContent = days < 10 ? `0${days}` : days;
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // 如果倒计时结束，显示特殊消息
        if (difference < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // 可以添加倒计时结束后的操作
            document.querySelector('.coming-soon-content p').textContent = '我们的项目即将发布！';
        }
    }
    
    // 初始化倒计时
    updateCountdown();
    
    // 每秒更新一次倒计时
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // 订阅表单处理
    const subscribeForm = document.getElementById('subscribeForm');
    const formMessage = document.getElementById('formMessage');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // 这里可以添加实际的表单提交逻辑
            // 模拟表单提交成功
            formMessage.textContent = '感谢订阅！我们会及时通知您最新消息。';
            formMessage.style.color = 'var(--success-color)';
            
            // 清空输入框
            document.getElementById('email').value = '';
            
            // 3秒后清空消息
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        });
    }
});