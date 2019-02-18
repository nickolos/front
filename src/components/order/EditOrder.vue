<template>
    <div class="container">
        <form @submit="checkForm" novalidate="true">
            <div class="row error" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
            </div>
            <p>
                <label>Input Time</label>
                <datetime type="datetime" v-model="datetime13" format="yyyy-MM-dd HH:mm:ss" name ="datetime13"></datetime>
            </p>

            <p>
                <label for="toAddress">Input To Address</label>
                <input id="toAddress" v-model="toAddress" type="text" name="toAddress">
            </p>

            <p>
                <label for="fromAddress">Input To Address</label>
                <input id="fromAddress" v-model="fromAddress" type="text" name="fromAddress">
            </p>

            <p>
                <input class="button-primary" type="submit"  value="Change">
            </p>
            <p>
            <div class="button button-outline" style="margin-left:10px;" @click="cancel">Cancel</div>
        </form>
    </div>
</template>

<script>
    import {HTTP} from '@/util/http'
    import toast from '@/util/toast'
    export default {
        name: "editOrder",
        props: ['order'],
    data () {
        return {
            errors: [],
            datetime13: this.order.datetime13,
            toAddress: this.order.toAddress,
            fromAddress :this.order.fromAddress
        }
    },
    methods: {
        checkForm(e) {
            this.errors = [];
            if (!this.toAddress) {
                this.errors.push("Where we go?")
            } else if (!this.fromAddress) {
                this.errors.push("From where we are going?")
            }
            if (!this.errors.length) {
                this.submitUpdateOrder()
                this.datetime13,
                    this.toAddress,
                    this.fromAddress
            }
            e.preventDefault()
        },
        submitUpdateOrder(retry = true) {
            HTTP.patch('taxi/order/taxi/' + this.order.UID, JSON.stringify({
                "user_id": localStorage.getItem(UID),
                "user_name": this.login.username,
                'time': this.datetime13.toString(),
                'from_address': this.fromAddress,
                "to_address": this.toAddress
            }), {headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}})
                .then(() => {
                    toast.success('Order updated')
                    this.$parent.closeEditForm()
                })
               // .catch(error => {
                    // if (retry && error.response.status === 403) {
                    //     if (localStorage.getItem('refreshToken')) {
                    //         this.$store.dispatch('refresh')
                    //         this.submitPost(retry = false)
                    //     } else {
                    //         this.$store.dispatch('logout')
                    //         this.$router.push('/login/')
                    //     }
                    // }
                    toast.error(error.message)
             //   })
        },
        cancel() {
            this.$parent.closeEditForm()
        }
    }
}
</script>
