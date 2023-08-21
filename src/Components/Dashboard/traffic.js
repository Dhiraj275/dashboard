import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDataLayerValue } from '../../DataLayer/DataLayer';
export const TrafficByDevice = (props) => {
  const [{ users, lengths }] = useDataLayerValue()
  const [Time, setTime] = useState(false)

  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [47, 33, 20],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: theme.palette.neutral[700],
        hoverBorderColor: theme.palette.neutral[700]
      }
    ],
    labels: ['Instagram', 'Facebook', 'Twitter']
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    borderColor: "none",
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 0,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Instagram',
      value:47,
      icon: Instagram,
      color: '#3F51B5'
    },
    {
      title: 'Facebook',
      value: 33,
      icon: Facebook,
      color: '#E53935'
    },
    {
      title: 'Twitter',
      value: 20,
      icon: Twitter,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="User Traffic" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
