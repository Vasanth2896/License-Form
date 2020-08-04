import React from 'react';
import { Paper, Grid } from "@material-ui/core";
import _ from 'lodash'
import InputSelect from '../../Common/InputSelect'
import { professionalDetailsFormStyles} from '../../Common/commonStyles'
import { professionalLevelCategory, professionalSalaryLevel } from '../../../seed/seed';

const ProfessionalForm = (props) => {
    const classes = professionalDetailsFormStyles();
    const { state, onChange } = props;
    const currentState = _.cloneDeep(state);
    const { professional } = currentState;

    const handleChange = (e) => {
        professional[e.target.name] = e.target.value;
        onChange('professional', professional);
    }

    return (
        <Paper className={classes.professionalDetailsFormStyles}>
            <div style={{ padding: '50px 40px 40px 40px', }}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Level'
                            labelId='level'
                            name='level'
                            handleChange={handleChange}
                            value={professional.level}
                            menuOptions={professionalLevelCategory}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputSelect
                            labelName='Salary per annum'
                            labelId='salary'
                            name='salary'
                            handleChange={handleChange}
                            value={professional.salary}
                            menuOptions={professionalSalaryLevel}
                        />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
}

export default ProfessionalForm;

