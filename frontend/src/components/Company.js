import { useState } from 'react';

function Company({ company, companies, setCompanies, contactId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCompany, setEditedCompany] = useState({
        company_name: company.company_name,
        company_address: company.company_address,
    });

    // Handle the edit form submission
    async function handleUpdate(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contactId}/companies/${company.company_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedCompany),
        });
            
        if (response.ok) {
            const updatedCompanies = companies.map((c) =>
                c.company_id === company.company_id ? { ...c, ...editedCompany } : c
            );
            setCompanies(updatedCompanies);
            setIsEditing(false);
        }
    }

    // Handle delete
    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch(`http://localhost/api/contacts/${contactId}/companies/${company.company_id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const newCompanies = companies.filter((c) => c.company_id !== company.company_id);
            setCompanies(newCompanies);
        }
    }

    return (
        <tr onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
                <>
                    <td >
                        <input
                            type="text"
                            value={editedCompany.company_name}
                            onChange={(e) => setEditedCompany({ ...editedCompany, company_name: e.target.value})}
                        />
                    </td>
                    <td >
                        <input
                            type="text"
                            value={editedCompany.company_address}
                            onChange={(e) => setEditedCompany({ ...editedCompany, company_address: e.target.value})}
                        />
                    </td>
                    <td>
                        <button className='button grey' onClick={handleUpdate}>Save</button>
                        <button className='button yellow' onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td style={{width: '150px'}}>{company.company_name}</td>
                    <td style={{width: '150px'}}>{company.company_address}</td>
                    <td>
                        <button className='button blue' onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="button red" onClick={doDelete}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Company;