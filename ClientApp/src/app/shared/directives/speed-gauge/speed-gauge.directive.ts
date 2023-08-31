import { Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
@Directive({
  selector: '[temperature-gauge]'
})
export class SpeedGaugeDirective implements OnInit,OnChanges {
  @Input() value=0;
  @Input() color="#38A3DA";
  myChart:echarts.ECharts;
  constructor(
    private element: ElementRef,
    private zone: NgZone,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.myChart==undefined || this.myChart==null){

    }
    else{
      if(changes['value'] || changes["color"]){
        this.updateValue();
      }
    }
  }

  private updateValue(){
    if(this.value!=null){
      this.myChart.setOption<echarts.EChartsOption>({
        series: [
          {
            itemStyle: {
              color: this.color
            },
            data: [
              {
                value: this.value
              }
            ]
          },
          {
            itemStyle: {
              color: '#38A3DA'
            },
          }
        ]
      });
    }
    
  }

  
  ngOnInit(): void {
    this.zone.runOutsideAngular(()=>{
      this.init();
      this.updateValue();
    });
  }

  private init(){
    let chartDom = document.getElementById(this.element.nativeElement.id)!;
        this.myChart = echarts.init(chartDom);
        let option = {
          series: [
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              splitNumber: 10,
              itemStyle: {
                color: '#38A3DA'
              },
              progress: {
                show: true,
                width: 20
              },
        
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: 20
                }
              },
              axisTick: {
                distance: -35,
                splitNumber: 5,
                lineStyle: {
                  width: 2,
                  color: '#999'
                }
              },
              splitLine: {
                distance: -35,
                length: 11,
                lineStyle: {
                  width: 3,
                  color: '#999'
                }
              },
              axisLabel: {
                distance: -13,
                color: '#999',
                fontSize: 11
              },
              anchor: {
                show: false
              },
              title: {
                show: false
              },
              detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 15,
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 24,
                fontWeight: 'bolder',
                formatter: '{value} °C',
                color: 'inherit'
              },
              data: [
                {
                  value: 0
                }
              ]
            },
        
            {
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 200,
              endAngle: -20,
              min: 0,
              max: 100,
              itemStyle: {
                color: '#38A3DA'
              },
              progress: {
                show: true,
                width: 6
              },
        
              pointer: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              detail: {
                show: false
              },
              data: [
                {
                  value: 0
                }
              ]
            }
          ]
        };
      this.myChart.setOption(option);

  }

}
