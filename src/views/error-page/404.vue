<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img
          class="pic-404__parent"
          src="@/assets/images/404-images/404.png"
          alt="404"
        >
        <img
          class="left pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="mid pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
        <img
          class="right pic-404__child"
          src="@/assets/images/404-images/404-cloud.png"
          alt="404"
        >
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline" />
        <div class="bullshit__info">
          Please check that the URL you entered is correct, or click the button
          below to return to the homepage.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi'

export default defineComponent({})
</script>

<style lang="postcss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);

  @apply top-2/5 left-1/2 absolute;
}

.wscn-http404 {
  @apply py-0 px-50px w-1200px relative overflow-hidden;

  .pic-404 {
    @apply w-600px relative float-left overflow-hidden;

    &__parent {
      @apply w-full;
    }

    &__child {
      @apply absolute;

      &.left {
        @apply top-17px left-220px w-80px;
        @apply opacity-0;

        animation-name: cloudLeft;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      &.mid {
        @apply top-10px left-420px w-46px;
        @apply opacity-0;

        animation-name: cloudMid;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1.2s;
      }

      &.right {
        @apply top-100px left-500px w-62px;
        @apply opacity-0;

        animation-name: cloudRight;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-delay: 1s;
      }

      @keyframes cloudLeft {
        0% {
          @apply opacity-0 top-17px left-220px;
        }

        20% {
          @apply opacity-100 top-33px left-188px;
        }

        80% {
          @apply opacity-100 top-81px left-92px;
        }

        100% {
          @apply opacity-0 top-97px left-60px;
        }
      }

      @keyframes cloudMid {
        0% {
          @apply opacity-0 top-10px left-420px;
        }

        20% {
          @apply opacity-100 top-40px left-360px;
        }

        70% {
          @apply opacity-100 top-130px left-180px;
        }

        100% {
          @apply opacity-0 top-160px left-120px;
        }
      }

      @keyframes cloudRight {
        0% {
          @apply opacity-0 top-100px left-500px;
        }

        20% {
          @apply opacity-100 top-120px left-460px;
        }

        80% {
          @apply opacity-100 top-180px left-340px;
        }

        100% {
          @apply opacity-0 top-200px left-300px;
        }
      }
    }
  }

  .bullshit {
    @apply relative float-left overflow-hidden;
    @apply py-30px px-0 w-300px;

    &__oops {
      @apply font-bold text-32px leading-40px;
      @apply mb-20px opacity-0 text-blue-500;

      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      @apply font-bold text-20px leading-24px;
      @apply mb-10px opacity-0 text-slate-900;

      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      @apply text-13px leading-21px ;
      @apply mb-30px opacity-0 text-gray-400;

      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    &__return-home {
      @apply h-36px w-110px block float-left;
      @apply bg-blue-500 rounded-100px opacity-0;
      @apply text-white text-center text-14px leading-36px;
      @apply cursor-pointer;

      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);

        @apply opacity-0;
      }

      100% {
        transform: translateY(0);

        @apply opacity-100;
      }
    }
  }
}
</style>
