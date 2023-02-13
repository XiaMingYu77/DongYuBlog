<template>
    <!-- 旋转正方形 -->
    <div class="rotatecube2">
        <ul class="cube-inner">
            <li class="top"></li>
            <li class="bottom"></li>
            <li class="front"></li>
            <li class="back"></li>
            <li class="right"></li>
            <li class="left"></li>
        </ul>
        <ul class="cube">
            <li class="top"></li>
            <li class="bottom"></li>
            <li class="front"></li>
            <li class="back"></li>
            <li class="right"></li>
            <li class="left"></li>
        </ul>
    </div>
</template>

<style scoped>
/* 旋转正方形 */
.rotatecube2 {
    position: relative;
    width: 100%;
    height: 8vh;
}

li {
    list-style: none;
}

.cube-inner {
    transform-style: preserve-3d;
    transform: rotateX(-25deg) rotateY(45deg);
    animation: slowspin 6s ease-in-out infinite;
}

.cube-inner li {
    box-sizing: border-box;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    width: 4vh;
    height: 4vh;
    background: rgb(48, 72, 85);
    border: 8px solid rgba(221, 221, 221, 0.842);
}

.cube-inner .top {
    transform: rotateX(90deg) translateZ(2vh);
}

.cube-inner .bottom {
    transform: rotateX(-90deg) translateZ(2vh);
}

.cube-inner .front {
    transform: translateZ(2vh);
}

.cube-inner .back {
    transform: rotateX(-180deg) translateZ(2vh);
}

.cube-inner .left {
    transform: rotateY(-90deg) translateZ(2vh);
}

.cube-inner .right {
    transform: rotateY(90deg) translateZ(2vh);
}

.cube {
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-25deg) rotateY(45deg);
    animation: fastspin 6s ease-in-out infinite;
}

.cube li {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 10vh;
    height: 10vh;
    background: rgba(130, 205, 240, 0.3);
    border: 8px solid rgba(221, 221, 221, 0.842);
}

.cube .top {
    transform: rotateX(90deg) translateZ(5vh);
}

.cube .bottom {
    transform: rotateX(-90deg) translateZ(5vh);
}

.cube .front {
    transform: translateZ(5vh);
}

.cube .back {
    transform: rotateX(-180deg) translateZ(5vh);
}

.cube .left {
    transform: rotateY(-90deg) translateZ(5vh);
}

.cube .right {
    transform: rotateY(90deg) translateZ(5vh);
}

@keyframes fastspin {
    0% {
        transform: rotateX(-25deg) rotateY(45deg);
    }

    60%,
    to {
        transform: rotateX(-25deg) rotateY(-315deg);
    }
}

@keyframes slowspin {

    0%,
    5% {
        transform: rotateX(-25deg) rotateY(45deg);
    }

    70%,
    to {
        transform: rotateX(-25deg) rotateY(315deg);
    }
}
</style>