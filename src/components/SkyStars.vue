<template>
  <div class="stars"></div>
</template>

<script setup>
import { onMounted } from 'vue';

function init() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 30;
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 1}s`;
        starsContainer.appendChild(star);
    }
}

onMounted(() => {
    init();
})
</script>

<style>
.stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px white;
    animation: twinkle 2s infinite ease-in-out;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
}
</style>