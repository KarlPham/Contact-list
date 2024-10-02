import { useState } from "react";

function Phone(props) {
    const {contact, phone, phones, setPhones} = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editPhone,setEditPhone] = useState({
        phone_type: phone.phone_type,
        phone_number:phone.phone_number
    });
    async function handleUpdate(e) {
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/phones/${phone.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                editPhone
            ),
        });
            
        if (response.ok) {
            const updatedPhones = phones.map((p) =>
                p.id === phone.id ? { ...p, ...editPhone } : p
            );
            setPhones(updatedPhones);
            setIsEditing(false);
        }
    }

    async function deletePhone() {
        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones/' + phone.id, {
            method: 'DELETE',
        });

        let newPhones = phones.filter((p) => {
            return p.id !== phone.id;
        });

        setPhones(newPhones);
    }


	return (
		<tr onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
                <>
                <select value={editPhone.phone_type} onChange={(e) => setEditPhone({ ...editPhone, phone_type: e.target.value})}>
                <option value="">Select Category</option> 
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="mobile">Mobile</option>
                <option value="other">Other</option>
                </select>
                    <td >
                    <input
                            type="text"
                            value={editPhone.phone_number}
                            onChange={(e) => setEditPhone({ ...editPhone, phone_number: e.target.value})}
                        />
                    </td>
                    <td>
                        <button className='button grey' onClick={handleUpdate}>Save</button>
                        <button className='button yellow' onClick={() => setIsEditing(false)}>Cancel</button>
                    </td>
                </>
            ): (
            <>
            <td>{ phone.phone_type}</td>
            <td>{ phone.phone_number}</td>
            <td style={
                {
                    width: '14px',
                }
            }>
            <button className="button green" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="button red" onClick={deletePhone}>Delete</button>
            </td>
        </>
            )}
        </tr>
	);
}

export default Phone;
