const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapBtn = document.getElementById('snapBtn');
const smileContainer = document.getElementById('smileContainer');
const clearBtn = document.getElementById('clearBtn');

const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');

// 烂哏笑话数组
const jokes = [
  "Q：为什么香蕉总是被甩？A：因为它很『蕉』（叫）人烦。",
  "Q：为什么猪跑得慢？A：因为它『猪』（煮）饭太久。",
  "Q：你知道乌龟为什么不会飞吗？因为它怕『龟』速飞行。",
  "Q：为什么蚊子喜欢你？因为你是它的『血』友。",
  "Q：你知道鱼为什么不会上岸吗？因为它怕被『鱼』刑。",
  "Q：为什么马走路都跛？因为它是『马』虎的。",
  "Q：为什么鸭子不会上树？因为它怕被『鸭』打。",
  "Q：你知道什么鞋子最懒吗？拖鞋，因为它一直被拖。",
  "Q：为什么鸡不能游泳？因为它怕『鸡』冻。",
  "Q：为什么猪喜欢睡觉？因为它是睡『猪』（主）的人。",
  "Q：你知道什么花最爱笑吗？向日葵，因为它天天对着太阳笑。",
  "Q：为什么青蛙不会说话？因为它被『呱』噪死了。",
  "Q：为什么鹦鹉不会游泳？因为它怕被『鹦』下水。",
  "Q：你知道为什么椰子很孤单吗？因为它是『椰』孤单的。",
  "Q：为什么牛总是很忙？因为它是『牛』头马面。",
  "Q：为什么狮子很厉害？因为它是『狮』命难违。",
  "Q：你知道什么东西最懒吗？懒猫，因为它天天睡觉懒得动。",
  "Q：为什么蚂蚁喜欢搬家？因为它们是『蚂』上搬下。",
  "Q：你知道为什么蜗牛走得慢吗？因为它背着『蜗』壳跑。",
  "Q：为什么鹳鸟飞得高？因为它想『鹳』住天空。",
  "Q：为什么猴子喜欢吃香蕉？因为它是『猴』急的。",
  "Q：你知道为什么熊猫爱吃竹子吗？因为它是『熊』猫的口味。",
  "Q：为什么海豚喜欢跳跃？因为它在『海』底开派对。",
  "Q：为什么老鼠怕猫？因为它怕被『猫』吃。",
  "Q：为什么狗喜欢叫？因为它是『狗』吠非主人。",
  "Q：你知道为什么企鹅不会飞吗？因为它怕『企鹅』飞错地方。",
  "Q：为什么鸭子总是很吵？因为它是『鸭』鸦成群。",
  "Q：为什么马喜欢跑？因为它是『马』不停蹄。",
  "Q：你知道断讯最痛的是什么？不是没讯号，是断感情。",
  "Q：她说我像 WiFi——时好时坏，一接就断。"
];

// 打字机效果函数
function typeWriter(text, element, speed = 50) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// 显示随机烂哏并打字机效果
function showRandomJoke() {
  const idx = Math.floor(Math.random() * jokes.length);
  typeWriter(jokes[idx], jokeText, 40);
}

// 启动摄像头
async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      video.srcObject = stream;
      await video.play();
    } catch (err) {
      console.error('無法啟動攝像頭:', err);
      alert('攝像頭無法使用，請確認已允許權限。');
    }
  }
  
  // ✅ 确保页面加载后启动摄像头
  startCamera();
  

// 拍照生成笑臉，随机位置放置
function captureSmile() {
    const randomSize = 200 + Math.floor(Math.random() * 100); // 200~300px
    canvas.width = randomSize;
    canvas.height = randomSize;
  
    const ctx = canvas.getContext('2d');
    ctx.translate(randomSize, 0);
    ctx.scale(-1, 1); // 镜像自拍
    ctx.drawImage(video, 0, 0, randomSize, randomSize);
  
    const imgURL = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = imgURL;
    img.classList.add('smileFace');
  
    // ✅ 随机位置（页面任意处）
    img.style.top = Math.floor(Math.random() * (window.innerHeight - randomSize)) + "px";
    img.style.left = Math.floor(Math.random() * (window.innerWidth - randomSize)) + "px";
    img.style.width = `${randomSize}px`;
    img.style.height = `${randomSize}px`;
  
    smileContainer.appendChild(img);
  }
  
  snapBtn.addEventListener('click', captureSmile);
  
  
  // 绑定按钮事件
  jokeBtn.addEventListener('click', showRandomJoke);
  snapBtn.addEventListener('click', captureSmile);
  clearBtn.addEventListener('click', () => {
    smileContainer.innerHTML = "";
  });
  
 // ✅ 确保页面加载后启动摄像头
 startCamera();
  
  