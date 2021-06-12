<template>
    <loading v-if="show"></loading>
    <div id="message" v-else>
        <div class="content" v-html="$store.state.messageData.content"></div>
    </div>
</template>


<script>

import loading from 'components/loading/Loading'
import ciciButton from 'components/vant/ciciButton'

export default {
    name: "Message",
    components: {
        ciciButton,
        loading
    },
    created(){
        this.$store.dispatch('asyncMessageData');

        this.eventBus.$emit('tabbar',false)
    },
    computed: {
        show(){
            return this.$store.state.messageData == ''
        }
    },
    updated(){
    
        document.title = this.$store.state.messageData.description
        
    },
    destroyed(){
        this.eventBus.$emit('tabbar',true)
    }
}
</script>