<template>
    <div class="border-red">
        <div :id="id" class="canvas" v-bind:class="{ 'is-loading': isLoading }">
            <div class="lds-ellipsis" v-if="isLoading"><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</template>

<script lang="ts">
    /* tslint:disable */
    import {
        Component,
        Prop,
        Watch,
        Vue
    } from "vue-property-decorator";
    import CoinDataService from "./../utils/CoinDataService";
    import {
        Coin
    } from '@/store/coin'
    var CanvasJS = require('./../assets/vendors/canvasjs.min');
    CanvasJS = CanvasJS.Chart ? CanvasJS : (window as any).CanvasJS;
    @Component
    export default class AvaChart extends Vue {
        @Prop()
        data!: any;
        @Prop()
        id!: string;
        @Prop()
        price!: number;
        chart: any;
        isLoading = true;

        async drawChart(data: any) {
            setTimeout(() => {
                if (data) {
                    this.isLoading = false;

                    this.chart = new CanvasJS.Chart(this.id, {
                        animationEnabled: true,
                        title: {
                            text: ""
                        },
                        axisX: {
                            title: ""
                        },
                        axisY: {
                            title: "Price",
                            suffix: "$",
                            includeZero: true,
                            maximum: this.price + 0.2*this.price
                        },
                        data: [{
                            type: "splineArea",
                            name: "price",
                            connectNullData: true,
                            //nullDataLineDashType: "solid",
                            xValueType: "dateTime",
                            xValueFormatString: "DD MMM hh:mm TT",
                            yValueFormatString: "$#,##0.##\"\"",
                            dataPoints: this.data,
                    }]});
                    this.chart.render();
                }
            }, 50);
        }
        @Watch('data')
        async filterCoins(newData: string) {
            if (newData) {
                this.drawChart(newData);
            }
        }
    }
</script>

<style scoped lang="scss">
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--primary);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
.canvas {
    height: 350px;
    width: 100%;

}
.canvas.is-loading {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
