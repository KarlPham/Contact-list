import { useState, useEffect } from 'react';
import Company from './Company.js';
import NewCompany from './NewCompany.js';

function CompanyList({ contactId }) {
    const [companies, setCompanies] = useState([]);

    // Fetch the companies related to the contact
    useEffect(() => {
        fetch(`http://localhost/api/contacts/${contactId}/companies`)
            .then((response) => response.json())
            .then((data) => setCompanies(data))
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, [contactId]);

    return (
        <div className='phone-list'>
            <NewCompany contactId={contactId} companies={companies} setCompanies={setCompanies} />

            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <Company
                            key={company.company_id}
                            company={company}
                            companies={companies}
                            setCompanies={setCompanies}
                            contactId={contactId}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
