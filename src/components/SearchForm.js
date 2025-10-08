import React from "react";
import { Form, FormInput, FormGroup, FormButton } from "semantic-ui-react";

function SearchForm({ onSubmit = () => {}, onChange = () => {}, value = "" }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="search-form">
      <Form onSubmit={handleSubmit}>
        <FormGroup inline style={{ justifyContent: 'center', gap: '12px' }}>
          <FormInput
            value={value}
            onChange={onChange}
            placeholder="Enter GitHub username"
            style={{ minWidth: '300px' }}
          />
          <FormButton content="Search" />
        </FormGroup>
      </Form>
    </div>
  );
}

export default SearchForm;
