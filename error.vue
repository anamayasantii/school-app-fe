<template>
  <div>
    <div class="stars" ref="starsContainer"></div>
    
    <div class="container">
      <div class="astronaut">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="60" fill="white" opacity="0.9"/>
          <circle cx="85" cy="90" r="8" fill="#667eea"/>
          <circle cx="115" cy="90" r="8" fill="#667eea"/>
          <path d="M 80 110 Q 100 120 120 110" stroke="#667eea" stroke-width="3" fill="none" stroke-linecap="round"/>
          <rect x="60" y="40" width="80" height="40" rx="20" fill="rgba(255,255,255,0.3)"/>
          <circle cx="100" cy="50" r="15" fill="none" stroke="white" stroke-width="2"/>
        </svg>
      </div>
      
      <div class="error-code">{{ error.statusCode }}</div>
      <div class="error-message">Halaman Tidak Ditemukan</div>
      <div class="error-description">
        Maaf, halaman yang Anda cari sepertinya tersesat di luar angkasa. Mari kembali ke halaman utama.
      </div>
      <NuxtLink to="/" class="btn-home">Kembali ke Beranda</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
definePageMeta({
  layout: 'auth'
})
const props = defineProps({
  error: {
    type: Object,
    default: () => ({ statusCode: 404 })
  }
})

const starsContainer = ref(null)

onMounted(() => {
  // Generate random stars
  if (starsContainer.value) {
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      star.style.animationDelay = Math.random() * 3 + 's'
      starsContainer.value.appendChild(star)
    }
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 10;
  padding: 20px;
  max-width: 600px;
}

.error-code {
  font-size: 150px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.error-message {
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: 600;
}

.error-description {
  font-size: 16px;
  margin-bottom: 30px;
  opacity: 0.9;
  line-height: 1.6;
}

.btn-home {
  display: inline-block;
  padding: 15px 40px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: #f8f9fa;
}

.astronaut {
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 100px;
  }
  .error-message {
    font-size: 22px;
  }
  .astronaut {
    width: 150px;
    height: 150px;
  }
}
</style>