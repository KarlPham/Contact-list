import { useState } from 'react';

function NewCompany({ contactId, companies, setCompanies }) {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    async function createCompany(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contactId}/companies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
            }),
        });

        const newCompany = await response.json();

        if (response.ok) {
            setCompanies([...companies, newCompany]);
            setCompanyName('');
            setCompanyAddress('');
        }
    }

    return (
        <form className='new-company' onSubmit={createCompany} onClick={(e) => e.stopPropagation()}>
            <input
                type='text'
                placeholder='Company Name'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
                type='text'
                placeholder='Company Address'
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <button className='button green' type='submit'>Add Company</button>
        </form>
    );
}

export default NewCompany;