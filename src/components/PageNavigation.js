import React from "react";
import { FormButton } from "semantic-ui-react";

function PageNavigation({ page, results, onPrevPage, onNextPage }) {
  return (
    <div className="pageNavigation">
      {page > 1 && <FormButton onClick={onPrevPage}>Previous</FormButton>}
      {results.length > 0 && <FormButton onClick={onNextPage}>Next</FormButton>}
    </div>
  );
}
export default PageNavigation;
