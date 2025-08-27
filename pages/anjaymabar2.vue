<template>
  <div class="gallery-container">
    <!-- Thumbnail utama -->
    <div class="main-thumbnail" @click="openGallery(0)">
      <img :src="images[0]" alt="Main image" class="thumbnail-img">
    </div>
    
    <!-- Container untuk thumbnail kecil -->
    <div class="small-thumbnails">
      <!-- Thumbnail kecil 1 -->
      <div class="small-thumbnail" v-if="images.length > 1" @click="openGallery(1)">
        <img :src="images[1]" alt="Thumbnail 1" class="thumbnail-img">
      </div>
      
      <!-- Thumbnail kecil 2 -->
      <div class="small-thumbnail" v-if="images.length > 2" @click="openGallery(2)">
        <img :src="images[2]" alt="Thumbnail 2" class="thumbnail-img">
      </div>
      
      <!-- Thumbnail dengan indikator +X -->
      <div class="small-thumbnail more-indicator" v-if="images.length > 3" @click="openGallery(3)">
        <img :src="images[3]" alt="More images" class="thumbnail-img">
        <div class="indicator-overlay">
          <span class="indicator-text">+{{ images.length - 3 }}</span>
        </div>
      </div>
    </div>
    
    <!-- Modal Gallery -->
    <div v-if="galleryOpen" class="gallery-modal" @click="closeGallery">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeGallery">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z"/>
          </svg>
        </button>
        
        <div class="gallery-slider">
          <img :src="images[activeIndex]" :alt="'Image ' + (activeIndex + 1)" class="slider-image">
          
          <button v-if="activeIndex > 0" class="slider-nav prev" @click.stop="prevImage">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>
          
          <button v-if="activeIndex < images.length - 1" class="slider-nav next" @click.stop="nextImage">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        
        <div class="image-counter">
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import untuk Nuxt 3
import { ref } from 'vue'

// Props untuk komponen
const props = defineProps({
  images: {
    type: Array,
    default: () => [
      'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    ]
  }
})

// State untuk gallery
const galleryOpen = ref(false)
const activeIndex = ref(0)

// Method untuk membuka gallery
const openGallery = (index) => {
  activeIndex.value = index
  galleryOpen.value = true
  document.body.style.overflow = 'hidden' // Mencegah scroll di background
}

// Method untuk menutup gallery
const closeGallery = () => {
  galleryOpen.value = false
  document.body.style.overflow = 'auto' // Mengembalikan scroll
}

// Method untuk navigasi gambar
const nextImage = () => {
  if (activeIndex.value < props.images.length - 1) {
    activeIndex.value++
  }
}

const prevImage = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
}

// Handler untuk keyboard navigation
const handleKeydown = (e) => {
  if (!galleryOpen.value) return
  
  if (e.key === 'Escape') {
    closeGallery()
  } else if (e.key === 'ArrowRight') {
    nextImage()
  } else if (e.key === 'ArrowLeft') {
    prevImage()
  }
}

// Event listener untuk keyboard
if (process.client) {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.gallery-container {
  display: flex;
  gap: 8px;
  max-width: 400px;
}

.main-thumbnail {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.main-thumbnail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.small-thumbnails {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.small-thumbnail {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.small-thumbnail:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-indicator {
  position: relative;
}

.indicator-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
  position: relative;
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background: white;
}

.gallery-slider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: #f8f9fa;
}

.slider-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.slider-nav:hover {
  background: white;
}

.slider-nav.prev {
  left: 16px;
}

.slider-nav.next {
  right: 16px;
}

.image-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
}

/* Responsive design */
@media (max-width: 640px) {
  .gallery-container {
    flex-direction: column;
    max-width: 300px;
  }
  
  .main-thumbnail {
    width: 100%;
    height: 250px;
  }
  
  .small-thumbnails {
    flex-direction: row;
  }
  
  .small-thumbnail {
    width: 88px;
    height: 88px;
  }
  
  .gallery-modal {
    padding: 10px;
  }
  
  .slider-nav {
    width: 40px;
    height: 40px;
  }
  
  .slider-nav.prev {
    left: 8px;
  }
  
  .slider-nav.next {
    right: 8px;
  }
}
</style>