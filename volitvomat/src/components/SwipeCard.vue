<script>
import { ref, toRef, onMounted, onBeforeUnmount, computed } from 'vue';
import interact from "interactjs";
import images from '../images';

export default {
  emits: ['yes', 'no', 'more'],
  props: {
    title: String,
    description: String,
    imageUrl: String,
    swiping: Boolean
  },
  setup(props, ctx) {
    const title = toRef(props, 'title');
    const description = toRef(props, 'description');
    const imageUrl = toRef(props, 'imageUrl');
    const swiping = toRef(props, 'swiping');

    const interactPositionX = ref(0);
    const interactPositionY = ref(0);
    const interactElement = ref(null);
    const isInteractAnimating = ref(true);
    const isInteractDragged = ref(false);
    const colorGreen = ref(false);
    const colorRed = ref(false);

    // const interactYThreshold = 150;
    const interactXThreshold = 150;

    const transformString = computed(() => {
        if (!isInteractAnimating.value || !isInteractDragged.value) {
            return `translate3D(${interactPositionX.value}px, ${interactPositionY.value}px, 0)`;
        }
        return null;
    });

    function interactSetPosition(coordinates) {
        const { x = 0, y = 0 } = coordinates;
        interactPositionX.value = x;
        interactPositionY.value = y;
    };

    function resetCardPosition() {
      interactSetPosition({ x: 0, y: 0 });
    };
    
    // function interactUnsetElement() {
    //     interact(interactElement.value).unset();
    //     isInteractDragged.value = true;
    // };

    function playCard(interaction) {
        // interactUnsetElement();
        switch (interaction) {
            case 'ACCEPT_CARD':
                setTimeout(() => {
                  interactSetPosition({
                    x: 0,
                  });
                }, 400);
                ctx.emit('yes');
                break;
            case 'REJECT_CARD':
                setTimeout(() => {
                  interactSetPosition({
                    x: 0,
                  });
                }, 400);
                ctx.emit('no');
                break;
            // case 'SKIP_CARD':
            //     interactSetPosition({
            //         y: interactYThreshold
            //     });
            //     ctx.emit(SKIP_CARD);
            //     break;
        }
    };

    function showMore() {
      if (isTouchDevice()) {
        ctx.emit('more');
      }
    }

    function isTouchDevice() {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }

    onMounted(() => {
        const element = interactElement.value;
        console.log('Swiping?', swiping.value)
        if (swiping.value) {
          interact(element).draggable({
            onstart: () => {
                isInteractAnimating.value = false;
            },
            onmove: event => {
                const x = interactPositionX.value + event.dx;
                const y = interactPositionY.value + event.dy;
                if (x > interactXThreshold) {
                  colorGreen.value = true;
                } else if (x < -interactXThreshold) {
                  colorRed.value = true;
                } else {
                  colorGreen.value = false;
                  colorRed.value = false;
                }
                interactSetPosition({ x, y });
            },
            onend: () => {
                isInteractAnimating.value = true;
                colorGreen.value = false;
                colorRed.value = false;
                // resetCardPosition();

                if (interactPositionX.value > interactXThreshold) playCard('ACCEPT_CARD');
                else if (interactPositionX.value < -interactXThreshold) playCard('REJECT_CARD');
                // else if (interactPositionY.value > interactYThreshold) playCard('SKIP_CARD');
                else resetCardPosition();
            }
        });
      }  
    });

    onBeforeUnmount(() => {
        interact(interactElement.value).unset();
    });

    return {
      title,
      description,
      imageUrl,
      interactElement,
      isInteractAnimating,
      transformString,
      images,
      colorGreen,
      colorRed,
      showMore
    }
  }
}
</script>

<template>
  <div
    class="swipe-card"
    :class="{ isAnimating: isInteractAnimating, 'color-green': colorGreen, 'color-red': colorRed }"
    ref="interactElement"
    :style="{ transform: transformString }"
    @click="showMore()"
  >
    <img :src="images[imageUrl]" class="category-img" />
    <h4>{{ title }}</h4>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">

// fix mobile swiping
.swipe-card,
.swipe-card * {
  -ms-touch-action: none;
  touch-action: none;
}

.swipe-card {
  background-color: #fffaf7;
  border-radius: 3px;
  box-shadow: 0 0 4px 1px rgba(22, 22, 21, 0.7);
  color: #212121;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  padding: 100px 30px 60px 30px;
  height: 90%;
  max-height: 90%;
  overflow: hidden;
  position: relative;

  -webkit-transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear;
  -ms-transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear;
  transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear;

  // &.isAnimating {
  //   -webkit-transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear, transform 250ms ease;
  //   -ms-transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear, transform 250ms ease;
  //   transition: background-color 250ms linear, color 250ms linear, opacity 250ms linear, transform 250ms ease;
  // }

  h4 {
    margin-bottom: 20px;
  }

  .category-img {
    height: 70px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transition: opacity 250ms linear;
    -ms-transition: opacity 250ms linear;
    transition: opacity 250ms linear;
  }

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    h4 {
      min-width: 70%;
      max-width: 70%;
      margin: 0 auto;
    }
    p {
      font-size: 16px;
      line-height: 22px;
    }
    .category-img {
      height: 80px;
    }
  }

  @media (min-width: 1600px) {
    h4 {
      min-width: 50%;
      max-width: 50%;
    }
  }

  .more {
    color: black;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    background-image: linear-gradient(transparent, #fffaf7);
     -webkit-transition: background-image 250ms linear;
    -ms-transition: background-image 250ms linear;
    transition: background-image 250ms linear;

    @media (min-width: 992px) {
      display: none;
    }

    .show-more {
      height: 50px;
    }
  }
}

.color-green {
  background-color: #007a4b;
  color: #fffaf7;  
}

.color-red {
  background-color: #dc143c;
  color: #fffaf7;  
}

.color-green,
.color-red {
  opacity: 50%;
  .category-img {
    opacity: 0;
  }
  .more {
    opacity: 0;
  }
}

</style>
