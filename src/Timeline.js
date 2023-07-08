import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/timeline')(Highcharts); // Extend Highcharts with the timeline module

function Timeline() {
  const [orderTimelineData, setOrderTimelineData] = useState([]);

  //fetch the data from the database
  useEffect(() => {
    axios
      .get('http://localhost:3000/purchases')
      .then((response) => {
        const data = response.data;
        const timelineData = formatTimelineData(data);
        setOrderTimelineData(timelineData);
      })
      .catch((error) => {
        console.error('Error fetching order timeline data:', error);
      });
  }, []);

    //group delivery date by year/month
    const formatTimelineData = (data) => {
    const groupedData = data.reduce((result, order) => {
        const date = new Date(order.delivery_date);
        const year = date.getFullYear();
        const month = date.getMonth();


        const key = `${year}-${month}`;
        if (result[key]) {
          result[key].quantity += 1;
        } else {
          result[key] = {
            x: Date.UTC(year, month),
            quantity: 1,
          };
        }

        return result;
      }, {});

      // Sort the grouped data by time in ascending order
      const sortedData = Object.values(groupedData).sort((a, b) => a.x - b.x);

      // Format the data for the timeline chart
      return sortedData.map((item) => ({
        x: item.x,
        y: item.quantity,
      }));
    };

    const chartOptions = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Orders by delivery date',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b %Y',
        },
      },
      yAxis: {
        title: {
          text: 'Orders',
        },
      },
      series: [
        {
          name: 'Order Quantity',
          data: orderTimelineData,
        },
      ],
    };


  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default Timeline;
