import { Grid } from '@material-ui/core'
import React from 'react';
import HighlightCard from './HightLightCard';

const Highlight = ({ orders, users, delivered }) => {
  const summary = [
    {
      title: 'The number of users',
      count: users,
      type: 'customers'
    },
    {
      title: 'The number of orders',
      count: orders,
      type: 'orders'
    },
    {
      title: 'Number of products delivered',
      count: delivered,
      type: 'delivered'
    }
  ];

  return (
    <Grid container spacing={3}>
      {
        summary.map(item => (
          <Grid item sm={4} xs={12} key={item.type} >
            <HighlightCard
              title={item.title}
              count={item.count}
              type={item.type}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default Highlight;