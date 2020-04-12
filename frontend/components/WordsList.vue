<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-height="itemHeight"
    v-infinite-scroll="callbackOnLoad" 
    :infinite-scroll-disabled="busy" 
    :infinite-scroll-distance="505"
  >

    <app-word
      slot-scope="{ item, index }"
      :hasAction="hasAction"
      :index="index"
      :wordId="item.id"
      :original="item.original"
      :translate="item.translate"/>
  </RecycleScroller>
</template>

<script>
import Word from '~/components/Word'

export default {
  data: () => ({
    busy: false
  }),

  components: {
    'app-word': Word,
  },

  props: {
    itemHeight: {
      type: Number,
      default: 50
    },
    hasAction: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      required: true 
    },
    callback: {
      type: Function,
			default: () => {}
    },
    needUpdate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    renderList() {
      return Array.isArray(this.list) && this.list.length
    }
  },

  methods: {
    async callbackOnLoad() {
      if (this.needUpdate) {
        this.busy = true
        await this.callback()
        this.busy = false
        this.$emit('load')
      }
    }
  }
}
</script>

<style scoped>
.scroller {
  height: 100%;
}
</style>
