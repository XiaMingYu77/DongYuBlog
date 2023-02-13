<template>
    <!-- 旋转正方形 -->
    <div class="rotatecube1">
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
.rotatecube1 {
    margin-top: 25vh;
    position: relative;
    grid-row: 2/3;
    grid-column: 1/2;
    width: 100%;
}

li {
    list-style: none;
}

.cube-inner {
    transform-style: preserve-3d;
    transform: rotateX(-25deg) rotateY(45deg);
}

.cube-inner li {
    box-sizing: border-box;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    width: 6vh;
    height: 6vh;
    background: rgb(48, 72, 85);
    border: 8px solid rgba(221, 221, 221, 0.842);
}

.cube-inner .top {
    transform: rotateX(90deg) translateZ(3vh);
}

.cube-inner .bottom {
    transform: rotateX(-90deg) translateZ(3vh);
}

.cube-inner .front {
    transform: translateZ(3vh);
}

.cube-inner .back {
    transform: rotateX(-180deg) translateZ(3vh);
}

.cube-inner .left {
    transform: rotateY(-90deg) translateZ(3vh);
}

.cube-inner .right {
    transform: rotateY(90deg) translateZ(3vh);
}

.cube {
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(-25deg) rotateY(45deg);
}

.cube li {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 15vh;
    height: 15vh;
    background: rgba(130, 205, 240, 0.3);
    border: 8px solid rgba(221, 221, 221, 0.842);
}

.cube .top {
    transform: rotateX(90deg) translateZ(7.5vh);
}

.cube .bottom {
    transform: rotateX(-90deg) translateZ(7.5vh);
}

.cube .front {
    transform: translateZ(7.5vh);
}

.cube .back {
    transform: rotateX(-180deg) translateZ(7.5vh);
}

.cube .left {
    transform: rotateY(-90deg) translateZ(7.5vh);
}

.cube .right {
    transform: rotateY(90deg) translateZ(7.5vh);
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

.displayArea:hover .cube-inner {
    animation: fastspin 6s ease-in-out infinite;
}
.displayArea:hover .cube {
    animation: slowspin 6s ease-in-out infinite;
}
</style>