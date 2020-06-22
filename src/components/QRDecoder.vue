<template>
    <div id="qr-decoder">
        <canvas ref="canva" style="display: none"></canvas>
        <video v-show="!isQR" ref="qrView" width="100%" height="200" autoplay></video>
<!--        <img v-show="isQR" :src="resSrc" style="width: 100%;"/>-->
<!--        <textarea>{{QRData}}</textarea>-->
        <v-btn @click="SwitchDecoder">{{ DecodeBtnText }}</v-btn>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import jsQR from "jsqr";
    export default Vue.extend( {
        name: 'QRDecoder',
        data() {
            return {
                QRData: "",
                video: null,
                stream: null,
                resSrc: "",
                isQR: false,
                isDecoding: false,
                DecodeBtnText: "",
                user: null
            }
        },
        mounted() {
            if (this.isDecoding) {
                this.DecodeBtnText = 'Распознаю QR код...';
            } else {
                this.DecodeBtnText = 'Распознать QR код';
            }
            this.video = this.$refs.qrView;
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }  }).then(stream => {
                    this.video.srcObject = stream;
                    this.stream = stream;
                }).catch(err => alert(err));
            }
        },
        methods: {
            async SwitchDecoder() {
                if (this.isDecoding) {
                    this.isDecoding = false;
                    this.DecodeBtnText = 'Распознать QR код';
                    return;
                } else {
                    this.isDecoding = true;
                    this.DecodeBtnText = 'Распознаю QR код...';
                    this.isQR = false;
                    this.QRData = "";
                    this.$store.commit("setUpQRCode", null);
                    await this.Sleep(300);
                    await this.Decoding();
                    return;
                }
            },

            async Sleep(del) {
                return new Promise(r => {
                    return setTimeout(() => r(), del);
                })
            },

            async Decoding() {
                if (!this.isDecoding) {
                    return;
                }
                let [code, err] = await this.DecodeQR();
                if (err) {
                    console.error(err);
                } else if (code) {
                    this.isQR = true;
                    this.$store.commit("setUpQRCode", JSON.parse(code.data));
                    this.QRData = this.$store.state.QRCode;
                    this.$emit('decoded')
                    return this.SwitchDecoder();
                }
                await this.Sleep(500);
                await this.Decoding();
            },

            async DecodeQR() {
                try {
                    let canvas: any = this.$refs.canva;
                    canvas.width = this.video.videoWidth;
                    canvas.height = this.video.videoHeight;
                    let ctx: any = canvas.getContext('2d');
                    ctx.drawImage(this.video, 0, 0);
                    console.log(this.video.videoWidth, this.video.videoHeight);
                    ctx.translate(this.video.videoWidth, 0);
                    ctx.scale(-1, 1);
                    this.resSrc = canvas.toDataURL();
                    let imageData = ctx.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);
                    return [jsQR(imageData.data, imageData.width, imageData.height), null];
                } catch (e) {
                    return [null, e];
                }
            }
        }
    })
</script>
