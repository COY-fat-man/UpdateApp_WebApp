import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { NhietDo_Model } from 'src/app/data/models/toa-xe/nhiet-do.model';
declare var CanvasJS: any;

export interface LineVisibleTemp {
  temp0: boolean;
  temp1: boolean;
  temp2: boolean;
}

@Directive({
  selector: '[appTemperatureChart]'
})
export class TemperatureChartDirective implements OnChanges, OnInit {
  @Input() data: NhietDo_Model[] = [];
  @Input() lineVisible: LineVisibleTemp = {
    temp0: true,
    temp1: true,
    temp2: true
  }
  private chart: any;
  constructor(
    private element: ElementRef,
    private zone: NgZone,
  ) { }

  private lineIdx = {
    time: 0,
    temperature0: 1,
    temperature1: 2,
    temperature2: 3,
  }

  private colorLine = {
    temperature0: "rgba(75, 204, 116,0.9)",
    temperature1: "rgba(240, 24, 218,0.9)",
    temperature2: "rgba(7, 206, 237,0.9)",
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart == null) {
      // chart not render 
    }
    else {
      if (changes['data']) {
        this.update();
      }
      if (changes['lineVisible']) {
        this.updateLineChart();
      }
    }
  }

  private updateLineChart() {
    const dataTemp0 = this.chart.options.data[this.lineIdx.temperature0];
    const dataTemp1 = this.chart.options.data[this.lineIdx.temperature1];
    const dataTemp2 = this.chart.options.data[this.lineIdx.temperature2];
    dataTemp0.visible = this.lineVisible?.temp0 ?? true;
    dataTemp1.visible = this.lineVisible?.temp1 ?? true;
    dataTemp2.visible = this.lineVisible?.temp2 ?? true;
    this.chart.render();
  }

  private formatTooltip: (e: any) => void = (e) => {
    const temp0 = this.chart.options.data[this.lineIdx.temperature0];
    const temp1 = this.chart.options.data[this.lineIdx.temperature1];
    const temp2 = this.chart.options.data[this.lineIdx.temperature2];
    let entries: any[] = e.entries;
    let str = "<div style='font-size: 13px'> Thời gian " + e.entries[this.lineIdx.time].dataPoint.x + " </div>";
    str += "<div style='font-size: 13px;'>" + e.entries[this.lineIdx.time].dataPoint.z + "</div>";
    if (temp0.visible == undefined || temp0.visible == true)
      str += "<div style='font-size: 13px;color:rgba(75, 204, 116,0.9);'>Điện áp LTĐK (v): " + entries[this.lineIdx.temperature0].dataPoint.y + "</div>";
    if (temp1.visible == undefined || temp1.visible == true)
      str += "<div style='font-size: 13px;color:rgba(240, 24, 218,0.9);'>Điện áp MCĐT (v  ): " + entries[this.lineIdx.temperature1].dataPoint.y + "</div>";
    if (temp2.visible == undefined || temp2.visible == true)
      str += "<div style='font-size: 13px;color:rgba(7, 206, 237,0.9);'>Chạy tàu: " + entries[this.lineIdx.temperature2].dataPoint.y + "</div>";
    return (str);
  }

  private initChart() {
    this.chart = new CanvasJS.Chart(this.element.nativeElement.id,
      {
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        animationDuration: 2000,
        title: {
          text: "Đồ thị nhiệt độ",
          fontFamily: "Times New Roman",
          fontColor: "#2f4f4f",
          fontSize: 13,
          padding: 10,
          margin: 5,
          cornerRadius: 5,
          fontWeight: "bold"
        },
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            titleFontFamily: "Times New Roman",
            // valueFormatString: "DD-MM-YYYY"
          },
          labelWrap: false,
          labelFontSize: 12,
          title: "Thời gian",
          titleFontFamily: "Times New Roman",
          interlacedColor: 'rgba(220, 220, 220,0.1)',//"#F0F8FF",
          // valueFormatString: "HH:mm",
          titleFontSize: 12,
          margin: 3,
        },
        axisY: [{
          title: "Nhiệt độ (°C)",
          tickColor: "red",
          gridColor: "rgba(220, 220, 220,0.7)",
          titleFontFamily: 'Times New Roman',
          titleFontSize: 12,
          titleFontColor: "steelBlue",
          lineThickness: 2,
          labelFontSize: 10,
          interval: 15,
          minimum: 0,
          maximum: 100
        }],
        legend: {
          cursor: "pointer",
          fontSize: 11,
          itemclick: function (e: any) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }

            e.chart.render();
          }
        },
        toolTip: {
          enabled: true,
          shared: true,
          animationEnabled: true,
          // contentFormatter: this.formatTooltip,
        },

        data: [
          {
            type: "line",
            markerType: 'none',
            legendText: "Thời gian ",
            color: 'rgba(249, 31, 31,0.8)', //'#FEBB60',
            showInLegend: false,
            name: "Thời gian ",
            toolTipContent: null,// ẩn hiển thị tool tio
            dataPoints: [],
          },
          {
            type: "line",
            markerType: 'square',
            legendText: "Nhiệt độ 1 (°C)",
            color: this.colorLine.temperature0, //'#FEBB60',
            showInLegend: true,
            name: "Nhiệt độ 1 (°C)",
            dataPoints: [],
            xValueFormatString: "DD-MM-YYYY HH:mm:ss",
            visible: this.lineVisible?.temp0 ?? true,
          },
          {
            type: "line",
            markerType: 'square',
            legendText: "Nhiệt độ 2 (°C)",
            color: this.colorLine.temperature1, //'#FEBB60',
            showInLegend: true,
            name: "Nhiệt độ 2 (°C)",
            dataPoints: [],
            xValueFormatString: "DD-MM-YYYY HH:mm:ss",
            visible: this.lineVisible?.temp1 ?? true,
          },
          {
            type: "line",
            markerType: 'square',
            legendText: "Nhiệt độ 3 (°C)",
            color: this.colorLine.temperature2, //'#FEBB60',
            showInLegend: true,
            name: "Nhiệt độ 3 (°C)",
            dataPoints: [],
            xValueFormatString: "DD-MM-YYYY HH:mm:ss",
            visible: this.lineVisible?.temp2 ?? true,
          },
        ],
      });
    this.chart.render();
    this.update();
  }


  private clearAllPonint() {
    this.chart.options.data.forEach((value: any) => {
      value.dataPoints = [];
    });
    this.chart.render();
  }

  public update() {
    this.zone.runOutsideAngular(() => {
      this.showData();
    });
  }

  public addPoint(log: NhietDo_Model) {
    this.data.push(log);
    let m_created_at = moment(log.createdAt);
    // tính toán lại phạm vi đồ thị
    let m_time_chart_start = moment().add(-3600, 's');
    let m_time_chart_end = moment().add(20, 's');
    {
      let lineTemp0: Array<any> = this.chart.options.data[this.lineIdx.temperature0].dataPoints;
      let lineTemp1: Array<any> = this.chart.options.data[this.lineIdx.temperature1].dataPoints;
      let lineTemp2: Array<any> = this.chart.options.data[this.lineIdx.temperature2].dataPoints;
      // so sánh với thời gian cũ nhất 
      var add_point = true;
      // nếu dữ liệu trống
      if (lineTemp0 == null || lineTemp0.length == 0) {
        add_point = true;
      }
      else {
        var m_last_time = moment(lineTemp0[lineTemp0.length - 1].x);
        if (m_last_time.isSame(m_created_at))// hoặc thời gian cũ hơn thì thêm mới vào đồ thị
        {
          add_point = false;
        }
        else
          add_point = true;
      }
      if (add_point == true) {
        const date = new Date(log.createdAt);
        // thêm giá trị vào đồ thị
        lineTemp0.push({
          x: date,
          y: log.temperature0
        });
        lineTemp1.push({
          x: date,
          y: log.temperature1
        });
        lineTemp2.push({
          x: date,
          y: log.temperature2
        });

        let count_remove_row = 10;
        while (count_remove_row > 0) {
          const first_point_log = lineTemp0[0];
          if (first_point_log == null)
            break;
          else {
            const dt_first_point = moment(first_point_log.x);
            if (dt_first_point.isBefore(m_time_chart_start)) {
              lineTemp0.shift();
              lineTemp1.shift();
              lineTemp2.shift();
              count_remove_row--;
            }

            else
              break;
          }
        }
        let time_add_30s = moment().add(60, 's').format("YYYY-MM-DDTHH:mm:ss");
        this.chart.options.axisX.maximum = new Date(time_add_30s);
        // cập nhật lại tỉ lệ đồ thị
        this.chart.render();

      }
    }
  }

  private showData() {
    this.clearAllPonint();
    let lineTemp0: Array<any> = this.chart.options.data[this.lineIdx.temperature0].dataPoints;
    let lineTemp1: Array<any> = this.chart.options.data[this.lineIdx.temperature1].dataPoints;
    let lineTemp2: Array<any> = this.chart.options.data[this.lineIdx.temperature2].dataPoints;
    let lineTime: any[] = this.chart.options.data[this.lineIdx.time].dataPoints;

    if (this.data.length > 0) {
      // do dữ liệu trả về xắp xếp theo chiều giảm dần 
      for (let i = this.data.length - 1; i >= 0; i--) {
        const logItem = this.data[i];
        const logs = this.data;
        if (i < logs.length - 1 && i > 0) {
          //bất đầu từ vị trí điểm thứ 2
          const date = new Date(logItem.createdAt);
          let time_after_sub_2_min = moment(logs[i].createdAt).add(-120, 's');
          let time_first = moment(logs[i + 1].createdAt);
          //nếu thời gian sau đã trừ đi 2 phút rồi mà thời gian trước vẫn sớm hơn
          if (time_first.isBefore(time_after_sub_2_min)) {
            lineTemp0.push({ x: date, y: null });
            lineTemp1.push({ x: date, y: null });
            lineTemp2.push({ x: date, y: null });
          }
          lineTime.push({ x: logItem.createdAt, z: moment(logItem.createdAt).format("DD-MM-YYYY HH:mm:ss") })
          lineTemp0.push({ x: date, y: logItem.temperature0 });
          lineTemp1.push({ x: date, y: logItem.temperature1 });
          lineTemp2.push({ x: date, y: logItem.temperature2 });

        }

      }
      this.chart.render();
    }
  }


  ngOnInit() {
    this.zone.runOutsideAngular(async () => {
      this.initChart();
    });
  }

}
