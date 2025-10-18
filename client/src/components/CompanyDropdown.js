import React from 'react';
import Select from 'react-select';

const CompanyDropdown = ({ companies, value, onChange, isClearable = true }) => {
  // Transform companies array into React Select format
  const options = companies.map(company => ({
    value: company.id,
    label: company.company_name
  }));

  // Add "None" option for deselection
  const allOptions = [
    { value: null, label: 'None' },
    ...options
  ];

  // Find the selected option
  const selectedOption = allOptions.find(opt => opt.value === value) || null;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? '#ea580c' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(234, 88, 12, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#ea580c'
      },
      minHeight: '40px',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#ea580c' : state.isFocused ? '#fed7aa' : 'white',
      color: state.isSelected ? 'white' : '#111827',
      cursor: 'pointer',
      padding: '10px 12px',
      fontSize: '14px',
      '&:active': {
        backgroundColor: '#ea580c'
      }
    }),
    menu: (base) => ({
      ...base,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      overflow: 'hidden'
    }),
    menuList: (base) => ({
      ...base,
      padding: '0'
    })
  };

  return (
    <Select
      options={allOptions}
      value={selectedOption}
      onChange={(option) => onChange(option?.value || null)}
      isClearable={isClearable}
      isSearchable={true}
      placeholder="Select a company..."
      noOptionsMessage={() => 'No companies found'}
      styles={customStyles}
      aria-label="Company selector"
    />
  );
};

export default CompanyDropdown;
