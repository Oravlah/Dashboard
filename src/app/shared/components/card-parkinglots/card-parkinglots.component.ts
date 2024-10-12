import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ParkinglotsService } from '../../services/parkinglots.service';
import { ParkingLot } from '../../models/Parkinglot.model';
import { NgClass } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  selector: 'app-card-parkinglots',
  templateUrl: './card-parkinglots.component.html',
  styleUrls: ['./card-parkinglots.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class CardParkinglotsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gaugeChartElement', { static: false }) gaugeChartElement!: ElementRef;

  parkinglot: ParkingLot[] = [];
  totalDisponibles: number = 0;
  totalOcupados: number = 0;
  totalReservados: number = 0;
  total: number = 0;

  // Variables para los porcentajes por tipo
  porcentajeEstudiante: number = 0;
  porcentajeDocente: number = 0;
  porcentajeAdministrativo: number = 0;
  porcentajePreferencial: number = 0;

  // Variables para el grado de uso
  gradeOfUse: { low: number; normal: number; medium: number; high: number } = {
    low: 0,
    normal: 0,
    medium: 0,
    high: 0
  };

  private gaugeChartInstance!: echarts.ECharts;

  constructor(private parkinglotsService: ParkinglotsService) { }

  ngOnInit() {
    this.parkinglotsService.getParkingLots().subscribe((res: ParkingLot[]) => {
      this.parkinglot = res;

      this.totalDisponibles = res.filter(item => item.status === 'disponible').length;
      this.totalOcupados = res.filter(item => item.status === 'ocupado').length;
      this.totalReservados = res.filter(item => item.status === 'reservado').length;
      this.total = this.parkinglot.length;

      // Calcular los porcentajes por tipo
      this.calculateTypePercentages();

      // Calcular el grado de uso
      this.calculateGradeOfUse();
    });
  }

  ngAfterViewInit(): void {
    this.initGaugeChart();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  calculateTypePercentages() {
    const totalEstudiante = this.parkinglot.filter(item => item.type === 'estudiante').length;
    const totalDocente = this.parkinglot.filter(item => item.type === 'docente').length;
    const totalAdministrativo = this.parkinglot.filter(item => item.type === 'administrativo').length;
    const totalPreferencial = this.parkinglot.filter(item => item.type === 'preferencial').length;

    if (this.total > 0) {
      this.porcentajeEstudiante = (totalEstudiante / this.total) * 100;
      this.porcentajeDocente = (totalDocente / this.total) * 100;
      this.porcentajeAdministrativo = (totalAdministrativo / this.total) * 100;
      this.porcentajePreferencial = (totalPreferencial / this.total) * 100;
    }
  }

  calculateGradeOfUse() {
    const totalEstacionamientos = this.parkinglot.length;

    // Cálculo de los grados de uso
    if (totalEstacionamientos > 0) {
      const lowThreshold = totalEstacionamientos * 0.25;
      const normalThreshold = totalEstacionamientos * 0.5;
      const mediumThreshold = totalEstacionamientos * 0.75;

      const totalDisponibles = this.parkinglot.filter(item => item.status === 'disponible').length;
      const totalOcupados = this.parkinglot.filter(item => item.status === 'ocupado').length;

      const totalUso = totalDisponibles + totalOcupados;

      const lowUsage = totalUso <= lowThreshold ? totalUso / lowThreshold : 1;
      const normalUsage = totalUso <= normalThreshold ? totalUso / normalThreshold : 1;
      const mediumUsage = totalUso <= mediumThreshold ? totalUso / mediumThreshold : 1;
      const highUsage = totalUso > mediumThreshold ? totalUso / totalEstacionamientos : 1;

      this.gradeOfUse = {
        low: Math.min(lowUsage, 1),
        normal: Math.min(normalUsage, 1),
        medium: Math.min(mediumUsage, 1),
        high: Math.min(highUsage, 1)
      };

      // Actualizar el gráfico
      this.updateGaugeChart();
    }
  }

  initGaugeChart(): void {
    this.gaugeChartInstance = echarts.init(this.gaugeChartElement.nativeElement);
    this.updateGaugeChart();
  }

  updateGaugeChart() {
    // Cálculo del grado de uso basado en los estacionamientos ocupados
    const totalEstacionamientos = this.parkinglot.length;
    const totalOcupados = this.parkinglot.filter(item => item.status === 'ocupado').length;

    let usageValue = 0;
    let usageTitle = '';

    if (totalEstacionamientos > 0) {
      usageValue = totalOcupados / totalEstacionamientos;
    }

    // Determinar el título basado en el valor del uso
    if (usageValue <= 0.25) {
      usageTitle = 'Bajo';
    } else if (usageValue <= 0.5) {
      usageTitle = 'Normal';
    } else if (usageValue <= 0.75) {
      usageTitle = 'Medio';
    } else {
      usageTitle = 'Alto';
    }

    // Configuración del gráfico
    const option = {
      title: {
        text: usageTitle,
        left: 'center',
        top: '10%',
        textStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          center: ['50%', '75%'],
          radius: '90%',
          min: 0,
          max: 1,
          splitNumber: 4,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.25, '#7CFFB2'],    // Bajo
                [0.5, '#58D9F9'],     // Normal
                [0.75, '#FDDD60'],    // Medio
                [1, '#FF6E76']        // Alto
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: 'auto',
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: 'auto',
              width: 5
            }
          },
          axisLabel: {
            color: '#464646',
            fontSize: 20,
            distance: -60,
            rotate: 'tangential',
            formatter: function (value: number) {
              if (value === 0.875) {
                return 'Alto';
              } else if (value === 0.625) {
                return 'Medio';
              } else if (value === 0.375) {
                return 'Normal';
              } else if (value === 0.125) {
                return 'Bajo';
              }
              return '';
            }
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-35%'],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value * 100) + '%';
            },
            color: 'inherit'
          },
          data: [
            {
              value: usageValue,
              name: 'Uso'
            }
          ]
        }
      ]
    };

    this.gaugeChartInstance.setOption(option);
  }

  onResize = () => {
    if (this.gaugeChartInstance) {
      this.gaugeChartInstance.resize();
    }
  };
}
