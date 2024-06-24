import React, { useState } from 'react';

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  margin: '0 auto',
};

const inputStyle: React.CSSProperties = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

const messageStyle: React.CSSProperties = {
  marginTop: '10px',
  padding: '10px',
  fontSize: '16px',
  textAlign: 'center',
};

const hiddenStyle: React.CSSProperties = {
  display: 'none',
};

const CandidateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    callInterval: '',
    linkedinProfile: '',
    githubProfile: '',
    comment: '',
    honeypot: '', // honeypot field
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
        // bot detected, maybe collect useful data
      return; 
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'comment'];
    for (const field of requiredFields) {
        //@ts-expect-error
      if (!formData[field]) {
        setMessage(`Please fill out the ${field} field.`);
        setIsSuccess(false);
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Candidate information submitted successfully!');
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          callInterval: '',
          linkedinProfile: '',
          githubProfile: '',
          comment: '',
          honeypot: '',
        });
        const data =  await response.json()

        console.log(data);
        
        
      } else {
        setMessage('Error submitting candidate information');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Error submitting candidate information');
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="callInterval"
        placeholder="Best Time to Call"
        value={formData.callInterval}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="url"
        name="linkedinProfile"
        placeholder="LinkedIn Profile URL"
        value={formData.linkedinProfile}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="url"
        name="githubProfile"
        placeholder="GitHub Profile URL"
        value={formData.githubProfile}
        onChange={handleChange}
        style={inputStyle}
      />
      <textarea
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={hiddenStyle}
      />
      <button type="submit" style={buttonStyle}>Submit</button>
      {message && (
        <div style={{ ...messageStyle, color: isSuccess ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </form>
  );
};

export default CandidateForm;
