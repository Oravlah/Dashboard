import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';
import { MessagesService } from '../../../shared/services/messages.service';
import { ParkinglotsService } from '../../../shared/services/parkinglots.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef;
  @ViewChild('messagesChart', { static: true }) messagesChartElement!: ElementRef;
  @ViewChild('typeChart', { static: true }) typeChartElement!: ElementRef;
  @ViewChild('usersChart', { static: true }) usersChartElement!: ElementRef;

  porcentajeDisponibles: number = 0;
  porcentajeOcupados: number = 0;
  porcentajeReservados: number = 0;

  pieChartData: number[] = [0, 0, 0];
  chartData: any[] = [];
  typeChartData: any[] = [];
  usersChartData: any[] = [];

  constructor(
    private parkinglotsService: ParkinglotsService,
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getParkingLotData();
    this.getMessagesData();
    this.getUsersData();
  }

  getParkingLotData() {
    this.parkinglotsService.getParkingLots().subscribe(parkingLots => {
      const total = parkingLots.length;
      const disponibles = parkingLots.filter(item => item.status === 'disponible').length;
      const ocupados = parkingLots.filter(item => item.status === 'ocupado').length;
      const reservados = parkingLots.filter(item => item.status === 'reservado').length;

      this.porcentajeDisponibles = (disponibles / total) * 100;
      this.porcentajeOcupados = (ocupados / total) * 100;
      this.porcentajeReservados = (reservados / total) * 100;

      this.pieChartData = [disponibles, ocupados, reservados];

      this.initPieChart();
      this.initTypeChart();
    });
  }

  getMessagesData() {
    this.messagesService.getMessages$().subscribe(messages => {
      const reasonCounts = this.getReasonCounts(messages);
      this.chartData = this.formatChartData(reasonCounts);
      this.initMessagesChart();
    });
  }

  getUsersData() {
    this.usersService.getUsers().subscribe(users => {
      const userTypeCounts = this.getUserTypeCounts(users);
      this.usersChartData = this.formatChartData(userTypeCounts);
      this.initUsersChart();
    });
  }

  getReasonCounts(messages: any[]): { [key: string]: number } {
    return messages.reduce((acc, message) => {
      acc[message.reason] = (acc[message.reason] || 0) + 1;
      return acc;
    }, {});
  }

  getUserTypeCounts(users: any[]): { [key: string]: number } {
    return users.reduce((acc, user) => {
      acc[user.type] = (acc[user.type] || 0) + 1;
      return acc;
    }, {});
  }

  formatChartData(counts: { [key: string]: number }) {
    return Object.keys(counts).map(key => ({
      value: counts[key],
      name: key
    }));
  }

  initPieChart() {
    const myChart = echarts.init(this.chartElement.nativeElement);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'  // Formato para mostrar cantidad y porcentaje
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Estado de Estacionamientos',
          type: 'pie',
          radius: '50%',
          data: [
            { value: this.pieChartData[0], name: 'Disponibles', itemStyle: { color: '#48F482' } },
            { value: this.pieChartData[1], name: 'Ocupados', itemStyle: { color: '#FF6384' } },
            { value: this.pieChartData[2], name: 'Reservados', itemStyle: { color: '#FFCE56' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  }


  initMessagesChart() {
    const messagesChart = echarts.init(this.messagesChartElement.nativeElement);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'  // Formato para mostrar cantidad y porcentaje
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Razón de Mensajes',
          type: 'pie',
          radius: '50%',
          data: this.chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    messagesChart.setOption(option);
  }


  initTypeChart() {
    const typeChart = echarts.init(this.typeChartElement.nativeElement);

    this.parkinglotsService.getParkingLots().subscribe(parkingLots => {
      const total = parkingLots.length;
      const totalEstudiante = parkingLots.filter(item => item.type === 'estudiante').length;
      const totalDocente = parkingLots.filter(item => item.type === 'docente').length;
      const totalAdministrativo = parkingLots.filter(item => item.type === 'administrativo').length;
      const totalPreferencial = parkingLots.filter(item => item.type === 'preferencial').length;

      const porcentajeEstudiante = (totalEstudiante / total) * 100;
      const porcentajeDocente = (totalDocente / total) * 100;
      const porcentajeAdministrativo = (totalAdministrativo / total) * 100;
      const porcentajePreferencial = (totalPreferencial / total) * 100;

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'  // Formato para mostrar cantidad y porcentaje
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Tipos de Estacionamiento',
            type: 'pie',
            radius: '50%',
            data: [
              { value: porcentajeEstudiante, name: 'Estudiantes', itemStyle: { color: '#FFCE56' } },
              { value: porcentajeDocente, name: 'Docentes', itemStyle: { color: '#FF6384' } },
              { value: porcentajeAdministrativo, name: 'Administrativos', itemStyle: { color: '#48F482' } },
              { value: porcentajePreferencial, name: 'Preferenciales', itemStyle: { color: '#7B68EE' } }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      typeChart.setOption(option);
    });
  }


  initUsersChart() {
    const usersChart = echarts.init(this.usersChartElement.nativeElement);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Tipo de Usuario',
          type: 'pie',
          radius: '50%',
          data: this.usersChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    usersChart.setOption(option);
  }
}
