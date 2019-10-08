<template>
  <div class="v-folding-cube">
    <div class="v-cube1 v-cube"></div>
    <div class="v-cube2 v-cube"></div>
    <div class="v-cube4 v-cube"></div>
    <div class="v-cube3 v-cube"></div>
  </div>
</template>

<style>
.v-folding-cube {
  position: relative;
  transform: rotateZ(45deg);
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
}

.v-folding-cube .v-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  transform: scale(1.1);
}
.v-folding-cube .v-cube:before {
  display: block;
  content: '\0020';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #aaa;
  animation: v-foldCubeAngle 2.4s infinite linear both;
  transform-origin: 100% 100%;
}
.v-folding-cube .v-cube2 {
  transform: scale(1.1) rotateZ(90deg);
}
.v-folding-cube .v-cube3 {
  transform: scale(1.1) rotateZ(180deg);
}
.v-folding-cube .v-cube4 {
  transform: scale(1.1) rotateZ(270deg);
}
.v-folding-cube .v-cube2:before {
  animation-delay: 0.3s;
}
.v-folding-cube .v-cube3:before {
  animation-delay: 0.6s;
}
.v-folding-cube .v-cube4:before {
  animation-delay: 0.9s;
}
@-webkit-keyframes v-foldCubeAngle {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes v-foldCubeAngle {
  0%,
  10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
