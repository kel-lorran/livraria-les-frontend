import { confirmTimeInterval } from 'utils';

export const chartDataMock = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      label: '# of No Votes',
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-2',
    },
  ],
};

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const inputMap = [
  [
    {
      componentName: 'MyInput',
      name: 'initialDate',
      label: 'data inicial',
      required: true,
      halfSize: true,
      className: 'fill',
      type: 'date',
      id: '439805734875',
      mask: (val = '') => val.substr(0, 10),
      max: (new Date()).toLocaleDateString('pt-BR').split('/').reverse().join('-')
    },
    {
      componentName: 'MyInput',
      name: 'finalDate',
      label: 'data final',
      required: true,
      halfSize: true,
      className: 'fill',
      type: 'date',
      mask: (val = '') => val.substr(0, 10),
      'data-inputmaster': '439805734875',
      onBlur: confirmTimeInterval,
      title: 'a data inicial não pode ser maior que a final',
      max: (new Date()).toLocaleDateString('pt-BR').split('/').reverse().join('-')
    }
  ]
]
