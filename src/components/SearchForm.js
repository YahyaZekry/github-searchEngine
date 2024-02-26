import React from "react";
import { Form, FormInput, FormGroup, FormButton } from "semantic-ui-react";

function SearchForm({ onSubmit, onChange, value }) {
  return (
    <div className="search-form">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <FormInput
            value={value}
            onChange={onChange}
            placeholder="Enter GitHub username"
          />
          <FormButton content="Search" />
        </FormGroup>
      </Form>
    </div>
  );
}

export default SearchForm;
