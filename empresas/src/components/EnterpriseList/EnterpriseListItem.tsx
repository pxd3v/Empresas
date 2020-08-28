import React from 'react';
import { Enterprise } from '../../services/getFilteredEnterprises';
import './styles.css';

interface EnterpriseListItemProps {
    enterprise: Enterprise;
}

export const EnterpriseListItem: React.FC<EnterpriseListItemProps> = ({enterprise}) => {
    console.log(enterprise.photo);
    return (
        <>
            <div className="List-Item-Photo">{enterprise.enterprise_name[0]}</div>
            <div className="List-Item-Text">
                <h1 className="List-Item-Text-Name">{enterprise.enterprise_name}</h1>
                <h2 className="List-Item-Text-Type">{enterprise.enterprise_type.enterprise_type_name}</h2>
                <p className="List-Item-Text-Description">{enterprise.description}</p>
            </div>
        </>
    );
};