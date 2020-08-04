import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const TableHeaderContent = (props) => {
    const { columnName,columnSortState } = props;

    return (
        <div className='tableHeaderContent'>
            <span style={{ fontWeight: 'bold' }}>{columnName}</span>
            <div style={{ pointerEvents: 'auto', transform: columnSortState ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <FontAwesomeIcon icon={faSortAmountDown} style={{ color: 'blue' }} />
            </div>
        </div>
    )
}

export default TableHeaderContent;