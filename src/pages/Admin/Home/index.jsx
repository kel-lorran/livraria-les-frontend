
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import AdminHeader from '../shared/AdminHeader'
import * as S from './style';

import { chartDataMock, options as chartOptions, inputMap } from './helper';
import CustomForm from 'components/CustomForm';

import { searchOrders } from 'actions/orderActions';

const Home = () => {
    const [chartData, setChartData] = useState();

    const convertToChartDataFromat = (list, strInitialDate, strFinalDate) => {
        const getDaysAsArr = (start, end) => {
            const arr = [];
            const map = {};
            const labels = [];
            for (let dt = new Date(start), i = 0; dt <= end; dt.setDate(dt.getDate() + 1), i++) {
                const targetDate = new Date(dt);
                const strDateIso = targetDate.toISOString().replace(/t.+/gi, 'T00:00:00');
                arr.push(strDateIso);
                labels.push(targetDate.toLocaleString().substr(0, 10));
                map[strDateIso] = i;
            }
            return [arr, map, labels];
        };

        const [arrDays, mapDayIndex, labels] = getDaysAsArr(
            new Date(`${strInitialDate}T00:00:00`),
            new Date(`${strFinalDate}T00:00:00`)
        );

        const draftDataSets = list.reduce((ac, { merchandiseList, date }) => {
            merchandiseList.forEach(({ book: { title }, quantity }) => {
                if (ac[title]) {
                    ac[title].data[mapDayIndex[date.replace(/t.+/gi, 'T00:00:00')]] += +quantity
                } else {
                    const color = `${((Math.random() * 1000) % 256).toFixed()},${((Math.random() * 1000) % 256).toFixed()},${((Math.random() * 1000) % 256).toFixed()}`;
                    ac[title] = {
                        label: title.substr(0, 14),
                        data: Array(arrDays.length).fill(0),
                        backgroundColor: `rgb(${color})`,
                        borderColor: `rgba(${color}, 0.2)`,
                    }
                }
            })
            return ac;
        }, {});
        return { labels, datasets: Object.values(draftDataSets) }
    }

    const searchOrdersPerPeriodSubmit = async ({ initialDate, finalDate }) => {
        if (initialDate >= finalDate)
            window.alert('A data inicial não pode ser mais atual que a data final')
        else {
            const _chartData = await searchOrders(`?searchtype=chart-populate&initialDate=${initialDate}&finalDate=${finalDate}`).then(r => r.data);
            setChartData(convertToChartDataFromat(_chartData, initialDate, finalDate));
        }
    }

    return (console.count('dashboard')) || (
        <S.PageWrapper>
            <AdminHeader />
            <main>
                <S.Container>
                    <h1>Dashboard</h1>
                    <h3>Selecione o intevalo de tempo do qual deseja visualizar os dados</h3>
                    <CustomForm inputMap={inputMap} onSubmit={searchOrdersPerPeriodSubmit} submmitButtonText="Pesquisar" />
                    <div >
                        {chartData && <Line data={chartData} options={chartOptions} />}
                    </div>
                </S.Container>
            </main>
        </S.PageWrapper>
    )
}

export default Home;
