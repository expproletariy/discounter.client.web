<template>
    <div id="qr-encoder">
        <img class="qrcode-img" :src="QRsrc" alt="HERE YOUr QR">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import QrcodeGenerator from "qrcode-generator";
    export default Vue.extend( {
        name: 'QREncoder',
        props: {
            phone: String,
            email: String,
            id: String,
        },
        mounted() {
            const qr = QrcodeGenerator(0, "H");
            let data = {
                phone: this.phone,
                email: this.email,
                id: this.id,
            };
            qr.addData(JSON.stringify(data));
            qr.make();
            this.$store.commit("setUpQRsrc", qr.createDataURL(10).replace("gif", "png"));
        },
        computed: {
            QRsrc() {
                return this.$store.state.QRsrc;
            }
        }
    })
</script>

<style lang="stylus">
    .qrcode-img
        width 100%
</style>
