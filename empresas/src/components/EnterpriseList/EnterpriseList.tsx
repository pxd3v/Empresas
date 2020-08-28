import React from 'react';
import { Enterprise } from '../../services/getFilteredEnterprises';
import { EnterpriseListItem } from './EnterpriseListItem';
import './styles.css';
interface EnterpriseListProps {
    enterprises: Enterprise[];
}

export const EnterpriseList: React.FC<EnterpriseListProps> = ({enterprises}) => {
    return (
        <>
            {
                enterprises.length ? 
                    <ul className="List">
                        {enterprises.map(e => <li key={e.id} className="List-Item"><EnterpriseListItem enterprise={e}/></li>)}
                    </ul>
                    :
                    <p className="Not-Found-Message"></p>
            }
        </>
    );
};