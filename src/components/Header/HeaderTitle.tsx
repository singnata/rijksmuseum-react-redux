import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import headerStyles from './HeaderStyles';

interface HeaderTitleProps {
  classes?: any;
}

const HeaderTitle = withStyles(headerStyles)(({ classes }: HeaderTitleProps) => {
  return (<div className={classes.headerTitle}>Collection</div>)
});

export default HeaderTitle;
