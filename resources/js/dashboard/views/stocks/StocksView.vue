<template>
    <ViewContainer>
        <template slot="header">
            Stocks
        </template>

        <div class="w-full md:flex xl:w-3/4 2xl:w-1/2">
            <div>
                    
            </div>            
        </div>

    </ViewContainer>
</template>

<script>
    import ViewContainer from '../ViewContainer';

    export default {

        data() {
            return {
                products: {
                    id: '',
                    name: '',
                    quantity: ''
                }
            }
        },

        components: {
            ViewContainer
        }
    }

</script>