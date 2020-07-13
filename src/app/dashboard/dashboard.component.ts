import {Component, OnInit, ViewChild} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {BASEURL} from '../BaseUrl';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RdvToAdd} from '../liste-rdv/add-rdv-dialog/add-rdv-dialog.component';
import {NotificationService} from '../NotifService/notification.service';
am4core.useTheme(am4themes_animated);
export class ChartData {
  x = null;
  y = null;
}
export class RespAgeChart {
  FirstCat = null;
  SecondCat = null;
  ThirdCat = null;
  FourthCat = null;
  FifthCat = null;
}
export class ResForWeekChart {
  NbreVisits = null;
  Visits: number[];
}
export class AppointmentsInfo {
  NbreVisits = null;
  RdvList: RdvToAdd[];
}
export class RespChartMonth {
  NbreVisitsMonth = null;
  ChartArray: number[];
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource;
  LoadingList = false;
  RdvToday = null;
  TodayAppointment = null;
  NbreAppointmentsMonth = null;
  Search = null;
  displayedColumns: string[] = ['Num', 'Name', 'DateVisit', 'Tel', 'LastVisit', 'NbrVisit', 'button'];
  // URLS
  urlLoadVisitsByWeek = BASEURL + 'Dashboard/LoadVisitsByWeek?IDDoct=' + sessionStorage.getItem('iddoct');
  urlLoadAppointments = BASEURL + 'Dashboard/LoadTodayAppointements?IDDoct=' + sessionStorage.getItem('iddoct');
  urlLoadAgeChart = BASEURL + 'Dashboard/LoadAgeChart?IDDoct=';
  urlDelRdv = BASEURL + 'Patients/DelRdv?ID=';

  constructor(private http: HttpClient, private notif: NotificationService) { }
  DATAMONTH = new Array<ChartData>(12);
  DATAWEEK = new Array<ChartData>(7);
  NbreAppointmentsWeek = null;

  ngOnInit(): void {
    this.InitChartMonth();
    this.InitChartWeek();
    this.InitChartTrancheDage();
    this.InitTab();
  }

  InitChartMonth() {
    let Ymax = null;
    this.http.get<RespChartMonth>(BASEURL + 'Dashboard/LoadChart?ID=' + sessionStorage.getItem('iddoct')).toPromise().then(data => {
      console.log(data);
      this.NbreAppointmentsMonth = data.NbreVisitsMonth;
      for (let i = 0; i < 12; i++)
      {
        const element = new ChartData();
        element.x = i;
        element.y = data.ChartArray[i];
        if (element.y > Ymax){
          Ymax = element.y;
        }
        this.DATAMONTH[i] = element;
      }
      console.log(this.DATAMONTH);
      // Create chart instance
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 25;
      chart.paddingBottom = 25;

// Add data
      chart.data = this.DATAMONTH;


// Create axes
      const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
      xAxis.renderer.grid.template.disabled = false;
      xAxis.renderer.labels.template.disabled = true;
      xAxis.min = 0;
      xAxis.max = 11;
      xAxis.strictMinMax = true;

      const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.numberFormatter = new am4core.NumberFormatter();
      yAxis.numberFormatter.numberFormat = '#.';
      yAxis.min = 0;
      yAxis.maxPrecision = 0;
      yAxis.max = Ymax + 2;

// Create series
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueX = 'x';
      series.dataFields.valueY = 'y';
      series.name = name;
      series.tooltipText = '[bold]{valueY} visites[/]';
      series.strokeWidth = 0;
      series.fillOpacity = 0.8;
      // series.propertyFields.fill = 'color';

// Create grid/ranges for X axis
      let months: string[];
      months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sept', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < chart.data.length; i++) {
        const value = chart.data[i].x;
        const range = xAxis.axisRanges.create();
        range.value = value;
        range.label.text = months[i];
      }

// Cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.snapToSeries = series;
    });
  }
  InitChartWeek(){
    const date = new Date().toLocaleDateString('fr');
    console.log(date + 'aaaaaaaaa');
    const daysOfTheWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const ThisWeek = new Array<string>();
    let today = new Date().getDay();
    for (let i = 0; i < 7; i++)
    {
      ThisWeek.push(daysOfTheWeek[today]);
      today--;
      if (today === -1)
      {
        today = 6;
      }
    }
    let Ymax = 0;
    this.http.get<ResForWeekChart>(this.urlLoadVisitsByWeek + '&Month=' + date.substr(3, 2) + '&Day=' + date.substr(0, 2)
      + '&Year=' + date.substr(6, 4))
      .toPromise().then(data => {
        this.NbreAppointmentsWeek = data.NbreVisits;
        console.log(data);
        for (let i = 0; i < 7; i++)
      {
        const element = new ChartData();
        element.x = 6 - i;
        element.y = data.Visits[i];
        if (element.y > Ymax){
          Ymax = element.y;
        }
        this.DATAWEEK[i] = element;
      }
        const chart = am4core.create('chartWeek', am4charts.XYChart);
        chart.paddingRight = 25;
        chart.paddingBottom = 25;

// Add data
        chart.data = this.DATAWEEK;


// Create axes
        const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        xAxis.renderer.grid.template.disabled = true;
        xAxis.renderer.labels.template.disabled = true;
        xAxis.renderer.grid.template.location = 0;
        xAxis.renderer.minGridDistance = 50;
        xAxis.min = 0;
        xAxis.max = 6;
        xAxis.strictMinMax = true;

        const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.numberFormatter = new am4core.NumberFormatter();
        yAxis.numberFormatter.numberFormat = '#.';
        yAxis.maxPrecision = 0;
        yAxis.min = 0;
        yAxis.max = Ymax + 2;
        yAxis.logarithmic = false;
        yAxis.renderer.minGridDistance = 20;

// Create series
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueX = 'x';
        series.dataFields.valueY = 'y';
        series.name = name;
        series.tooltipText = '[bold]{valueY} visites[/]';
        series.tensionX = 0.8;
        series.strokeWidth = 3;
        series.fillOpacity = 0.8;
      // series.propertyFields.fill = 'color';

        const bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color('#fff');
        bullet.circle.strokeWidth = 3;

// Create grid/ranges for X axis
        for (let i = 0; i < 7; i++) {
        const value = chart.data[i].x;
        const range = xAxis.axisRanges.create();
        range.value = value;
        range.label.text = ThisWeek[i];
      }

// Cursor

      // Add a guide
        const rangeY = yAxis.axisRanges.create();
        rangeY.value = 90.4;
        rangeY.grid.stroke = am4core.color('#396478');
        rangeY.grid.strokeWidth = 1;
        rangeY.grid.strokeOpacity = 1;
        rangeY.grid.strokeDasharray = '3,3';
        rangeY.label.inside = true;
        rangeY.label.text = 'Average';
        rangeY.label.fill = rangeY.grid.stroke;
        rangeY.label.verticalCenter = 'bottom';
    });
  }

  InitChartTrancheDage() {
    this.http.get<RespAgeChart>(this.urlLoadAgeChart + sessionStorage.getItem('iddoct')).toPromise().then(data => {

    const chart = am4core.create('chartAge', am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.paddingTop = -20;
    chart.paddingBottom = 0;
    chart.paddingLeft = 0;
    chart.paddingRight = 0;

    chart.data = [
      {
        country: '0 - 10 Ans',
        litres: data.FirstCat
      },
      {
        country: '11 - 20 Ans',
        litres: data.SecondCat
      },
      {
        country: '21 - 40 Ans',
        litres: data.ThirdCat
      },
      {
        country: '41 - 70 Ans',
        litres: data.FourthCat
      },
      {
        country: 'Plus de 70 ans',
        litres: data.FifthCat
      }
    ];
    console.log(data);
    chart.legend = new am4charts.Legend();
    chart.legend.paddingTop = -40;
    chart.legend.paddingBottom = 40;
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = 'litres';
    series.dataFields.category = 'country';
    series.ticks.template.disabled = true;
    series.labels.template.disabled = true;
    });
  }

  InitTab(){
    const date = new Date().toLocaleDateString('fr');
    this.http.get<AppointmentsInfo>(this.urlLoadAppointments + '&Month=' + date.substr(3, 2) + '&Day=' + date.substr(0, 2)
      + '&Year=' + date.substr(6, 4)).toPromise().then(data => {
        this.dataSource = data.RdvList;
        this.RdvToday = data.RdvList.length;
        this.TodayAppointment = data.NbreVisits;
        this.dataSource = new MatTableDataSource<RdvToAdd>(data.RdvList);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  DelSearch() {
    this.Search = '';
    this.applyFilter(this.Search);
  }
  DelRdv(ID) {
    this.http.delete(this.urlDelRdv + ID).toPromise().then(data => {
      this.InitTab();
      this.notif.showNotification('warning', 'Rendez-vous a été supprimé', 'delete');
    });
  }
}
