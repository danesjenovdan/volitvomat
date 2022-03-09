<script>
import { ref, toRef, onMounted, onBeforeUnmount, computed } from 'vue';
import interact from "interactjs";

export default {
  emits: ['yes', 'no'],
  props: {
    title: String,
    description: String,
    id: Number,
    currentId: Number
  },
  setup(props, ctx) {
    const title = toRef(props, 'title');
    const description = toRef(props, 'description');
    const id = toRef(props, 'id');
    const currentId = toRef(props, 'currentId');

    const isShowing = ref(id.value == currentId.value);
    const interactPositionX = ref(0);
    const interactPositionY = ref(0);
    const interactElement = ref(null);
    const isInteractAnimating = ref(true);
    const isInteractDragged = ref(false);

    const interactYThreshold = 150;
    const interactXThreshold = 100;
    const interactOutOfSightXCoordinate = 500;
    const interactOutOfSightYCoordinate = 600;

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
                interactSetPosition({
                    x: 0,
                });
                // setTimeout(() => {
                //     ctx.emit('yes');
                // }, 300);
                ctx.emit('yes');
                break;
            case 'REJECT_CARD':
                interactSetPosition({
                    x: 0,
                });
                // setTimeout(() => {
                //     ctx.emit('no');
                // }, 300);
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

    onMounted(() => {
        const element = interactElement.value;
        interact(element).draggable({
            onstart: () => {
                isInteractAnimating.value = false;
            },
            onmove: event => {
                const x = interactPositionX.value + event.dx;
                const y = interactPositionY.value + event.dy;
                interactSetPosition({ x, y });
            },
            onend: () => {
                isInteractAnimating.value = true;
                // resetCardPosition();

                if (interactPositionX.value > interactXThreshold) playCard('ACCEPT_CARD');
                else if (interactPositionX.value < -interactXThreshold) playCard('REJECT_CARD');
                // else if (interactPositionY.value > interactYThreshold) playCard('SKIP_CARD');
                else resetCardPosition();
            }
        });
    });

    onBeforeUnmount(() => {
        interact(interactElement.value).unset();
    });

    return {
        title,
        description,
        isShowing,
        interactElement,
        isInteractAnimating,
        transformString
    }
  }
}
</script>

<template>
  <div
    class="white-card"
    ref="interactElement"
    :style="{ transform: transformString }"
  >
    <h4>{{ title }}</h4>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<style scoped lang="scss">

.isAnimating {
  transition: all 0.5s ease;
}

// fix mobile swiping
.white-card,
.white-card * {
  -ms-touch-action: none;
  touch-action: none;
}

.white-card {
  background-color: #fffaf7;
  border-radius: 3px;
  box-shadow: 0 0 4px 1px rgba(22, 22, 21, 0.7);
  color: #212121;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  padding: 60px 30px;
  min-height: 400px;
  display: flex;
  align-items: center;

  .card-description {
    display: none;
  }

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    min-height: 550px;
    h4 {
      margin-bottom: 20px;
    }
    .card-description {
      display: block;
    }
  }
}
</style>