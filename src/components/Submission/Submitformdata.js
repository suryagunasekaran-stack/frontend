const submitFormData = async (data, authorSigRef, supervisorSigRef) => {
    try {
        // Transform the form data as needed
        const token = localStorage.getItem("token")
        const transformedData = data.items.map(item => {
            const selectedPPE = Object.keys(item.ppe).filter(ppeKey => item.ppe[ppeKey]);
            return { ...item, ppe: selectedPPE };
        });
        data.items = transformedData;

        const authorSignature = authorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');
        const supervisorSignature = supervisorSigRef.current?.getTrimmedCanvas().toDataURL('image/png');

        // Prepare the final form data
        const formData = {
            ...data,
            items: transformedData,
            authorSignature,
            supervisorSignature,
            rejections: [], // Adding an empty array for rejections
            version: 1,
            status: "pending"
        };

        // Submit the form data
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/toolboxformsubmit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });

        // Handle the response
        if (response.ok) {
            // eslint-disable-next-line
            const responseData = await response.json();
        } else {
            console.error('Server error:', response.status);
            alert('Error: Operation failed. Status code: ' + response.status);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
};

export default submitFormData;
