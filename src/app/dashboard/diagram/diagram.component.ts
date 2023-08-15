import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  constructor(public confDiagram: DynamicDialogConfig) { }
  data: any;
  data2: any;

  options: any;
  options2: any;

  ngOnInit(): void {
    let data = this.confDiagram.data.plan;

    let documentStyle = getComputedStyle(document.documentElement);
    let textColor = documentStyle.getPropertyValue('--text-color');
    let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      datasets: [
        {
          label: 'План',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: [data.plan_1, data.plan_2, data.plan_3, data.plan_4, data.plan_5, data.plan_6,
          data.plan_7, data.plan_8, data.plan_9, data.plan_10, data.plan_11, data.plan_12]
        },
        {
          label: 'Факт',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          borderColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [data.v_1, data.v_2, data.v_3, data.v_4, data.v_5, data.v_6,
          data.v_7, data.v_8, data.v_9, data.v_10, data.v_11, data.v_12]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }

      }
    };

    this.data2 = {
      labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      datasets: [
        {
          type: 'bar',
          label: 'Пропуск',
          backgroundColor: documentStyle.getPropertyValue('--gray-500'),
          data: [data.pr_1, data.pr_2, data.pr_3, data.pr_4, data.pr_5,
          data.pr_6, data.pr_7, data.pr_8, data.pr_9, data.pr_10, data.pr_11, data.pr_12]
        },
        {
          type: 'bar',
          label: 'Больничный',
          backgroundColor: documentStyle.getPropertyValue('--blue-300'),
          data: [data.b_1, data.b_2, data.b_3, data.b_4, data.b_5,
          data.b_6, data.b_7, data.b_8, data.b_9, data.b_10, data.b_11, data.b_12]
        },
        {
          type: 'bar',
          label: 'Отпуск',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [data.o_1, data.o_2, data.o_3, data.o_4, data.o_5,
          data.o_6, data.o_7, data.o_8, data.o_9, data.o_10, data.o_11, data.o_12]
        }
      ]
    };

    this.options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
