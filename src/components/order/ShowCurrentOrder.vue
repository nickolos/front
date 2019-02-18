<template>
    <div class="container mt-4">

        <table class="table table-bordered mt-4">
            <thead class="thead-light">
            <tr>
                <th width="10%">ID Order</th>
                <th width="10%">Driver Name</th>
                <th width="10%">Time</th>
                <th width="10%">From Address</th>
                <th width="10%">To Address</th>
                <th width="10%">Cost</th>
                <th width="10%">Status</th>
                <th width="150">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <div>
                    <template > {{ order.UID }}
                        <span >{{ item.code ===order.UID}}</span>
                    </template>
                        </div>
                </td>
                <td>
                    <div>
                    <template > {{ order.driver_name }}
                        <span >{{ item.driver_name === order.driver_name}}</span>
                    </template>
                        </div>
                </td>
                <td>
                    <div>
                    <template > {{ order.time }}
                        <span >{{ item.time ===order.time}}</span>
                    </template>
                        </div>
                </td>
                <td>
                    <div>
                    <template > {{ order.from_address }}
                        <span >{{ item.from_address ===order.from_address}}</span>
                    </template>
                        </div>
                </td>
                <td>
                    <div>
                    <template > {{ order.to_address }}
                        <span >{{ item.to_address ===order.to_address}}</span>
                    </template>
                        </div>
                </td>
                <td>
                    <div>
                    <template > {{ order.cost }}
                        <span >{{ item.cost ===order.cost}}</span>
                    </template>
                        </div>
                </td>

                <td>
                    <div>
                    <template > {{ order.order_status }}
                        <span >{{ order.order_status}}</span>
                    </template>
                    </div>
                </td>
                <td>
            <span>
              <button @click=showEditForm class="button button-outline" >Edit</button>
              <button @click=deleteOrder class="button button-outline" >Cancel a Taxi</button>
              <button @click=payOrder class="button button-outline">Pay Taxi</button>
            </span>
            <div class="row" v-if="editing">
                <EditOrder :order="order"></EditOrder>
            </div>

                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {HTTP} from '@/util/http'
import toast from '@/util/toast'

import EditOrder from '@/components/order/EditOrder.vue'


export default {
    name: "order",
    components: {
        EditOrder
    },

    props: ['order'],
    data () {
        return {
            editing: false,
            uid: localStorage.getItem('UID'),
            username: ''
        }
    },
    methods: {
        deleteOrder(retry=true) {
            var orderUID = this.order.UID
            HTTP.delete('taxi/order/' + this.order.UID, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}})
                .then(() => {
                    toast.success('Order canceled')
                    this.$parent.deleteOrder(orderUID)
                })
                .catch(error => {
                    if (retry && error.response.status === 403) {
                        this.handle403(() => this.deleteOrder(retry=false))
                    }
                    toast.error(error.message)
                })
        },
        payOrder (retry=true){
            var orderUID = this.order.UID
            HTTP.patc('taxi/payment/' + this.order.UID, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}})
                .then(() => {
                    toast.success('Pay success')
                    this.$parent.deleteOrder(orderUID)
                })
                .catch(error => {
                    if (retry && error.response.status === 403) {
                        this.handle403(() => this.payOrder(retry=false))
                    }
                    toast.error(error.message)
                })
        },

        showEditForm() {
            this.editing = true
        },
        closeEditForm() {
            this.editing = false
        },
        handle403(func) {
            if (localStorage.getItem('refreshToken')) {
                this.$store.dispatch('refresh')
                func()
            } else {
                this.$store.dispatch('logout')
                this.$router.push('/login/')
            }
        },
    }
}
</script>

