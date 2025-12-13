import React from "react";
import { FormButton } from "semantic-ui-react";

function PageNavigation({ page = 1, results = [], hasNextPage = false, onPrevPage = () => {}, onNextPage = () => {} }) {
  const showPrevButton = page > 1;
  const showNextButton = hasNextPage && results.length > 0;

  // Don't render the container if no buttons are shown
  if (!showPrevButton && !showNextButton) {
    return null;
  }

  return (
    <div className="pageNavigation">
      {showPrevButton && <FormButton onClick={onPrevPage}>Previous</FormButton>}
      {showNextButton && <FormButton onClick={onNextPage}>Next</FormButton>}
    </div>
  );
}
export default PageNavigation;
